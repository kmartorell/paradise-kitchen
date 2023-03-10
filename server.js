const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');           
const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', (process.env.PORT || 5000));

require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );

  next();
});

app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
  const { userId, card } = req.body;
  const newCard = {Card:card,UserId:userId};
  var error = '';
  try
  {
    const db = client.db("COP4331Cards");
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }
  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error, favorited recipes, created recipes
 var error = '';
  const { login, password } = req.body;
  const db = client.db("paradise_kitchen");
  const results = await 
  db.collection('Users').find({login:login,password:password}).toArray();
  var id = -1;
  var fn = '';
  var ln = '';
  var fav = [];
  var created = [];
  console.log(results);
  if( results.length > 0 )
  {
    id = results[0]._id;
    fn = results[0].firstName;
    ln = results[0].lastName;
    fav = results[0].favorites;
    created = results[0].createdRecipes;
  }else{
    error = 'Invalid username/password';
  }
  var ret = { id:id, firstName:fn, lastName:ln, favorites:fav, createdRecipes:created, error:error};
  res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => 
{
  // incoming: firstName, lastName, email, login, password, createdRecipes, favoriteRecipes
  // outgoing: if success or error
  var error = '';
  const { firstName, lastName, email, login, password } = req.body;
  try{
    const db = client.db("paradise_kitchen");
    const result = await db.collection('Users').insertOne({firstName:firstName, lastName:lastName, email:email, login:login,password:password, createdRecipes:[], favorites:[]});
    error = 'success'
  }
  catch(e)
  {
    error = e.toString();
  }
  var ret = { error: error };
  res.status(200).json(ret);
});
app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error
  var error = '';
  const { userId, search } = req.body;
  var _search = search.trim();
  
  const db = client.db("COP4331Cards");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});

///////////////////////////////////////////////////
// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}