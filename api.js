require('express');
require('mongodb');
//load user model
const User = require("./models/user.js");
//load card model
const Card = require("./models/card.js");

exports.setApp = function ( app, client )
{

  app.post('/api/addcard', async (req, res, next) =>
  {
    // incoming: userId, color
    // outgoing: error
    const { userId, card } = req.body;
    //const newCard = { Card: card, UserId: userId };
    const newCard = new Card({ Card: card, UserId: userId });
    var error = '';
    try
    {
      // const db = client.db();
      // const result = db.collection('Cards').insertOne(newCard);
      newCard.save();
    }
    catch (e)
    {
      error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
  });

  app.post('/api/login', async (req, res, next) =>
  {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    //const db = client.db();
    //const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
    const results = await User.find({ Login: login, Password: password });
    var id = -1;
    var fn = '';
    var ln = '';
    if( results.length > 0 )
    {
      id = results[0].UserId;
      fn = results[0].FirstName;
      ln = results[0].LastName;
    }
    var ret = { id:id, firstName:fn, lastName:ln, error:''};
    res.status(200).json(ret);
  });

  app.post('/api/searchcards', async (req, res, next) =>
  {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { userId, search } = req.body;
    var _search = search.trim();
    //const db = client.db();
    //const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
    const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
      _ret.push( results[i].Card );
    }
    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
  });

}
/*

app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
  const { userId, card, jwtToken } = req.body;

  try
  {
    if( token.isExpired(jwtToken))
    {
      var r = {error:'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return;
    }
  }
  catch(e)
  {
    console.log(e.message);
  }

  const newCard = {Card:card,UserId:userId};
  var error = '';

  try
  {
    const db = client.db();
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }

  var refreshedToken = null;

  try
  {
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }

  var ret = { error: error, jwtToken: refreshedToken };
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
    email = results[0].email;
    ln = results[0].lastName;
    fav = results[0].favorites;
    created = results[0].createdRecipes;
    try
    {
      const token = require("./createJWT.js");
      ret = token.createToken( fn, ln, id );
    }
    catch(e)
    {
      ret = {error:e.message};
    }
  }
  else
  {
    ret = {error:"Login/Password incorrect"};
  }
  var ret = { id:id, firstName:fn, lastName:ln, email:email, favorites:fav, createdRecipes:created, error:error};
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
  const { userId, search, jwtToken } = req.body;

  try
  {
    if( token.isExpired(jwtToken))
    {
      var r = {error:'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return;
    }
  }
  catch(e)
  {
    console.log(e.message);
  }

  var _search = search.trim();
  const db = client.db();
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*',
  $options:'r'}}).toArray();
  var _ret = [];

  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }

  var refreshedToken = null;

  try
  {
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
   console.log(e.message);
  }

  var ret = { results:_ret, error: error, jwtToken: refreshedToken };
  res.status(200).json(ret);
});

*/