require('express');
require('mongodb');
//load user model
const User = require("./models/user.js");
//load recipe model
const Recipe = require("./models/recipes.js");
const { response } = require('express');
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongoose/lib/schema.js');
var bigInt = require("big-integer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  user: "smtp.gmail.com",
  port: 465,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "",
  subject: '',
  text: ''
    
};

exports.setApp = function ( app, client )
{

  app.post('/api/login', async (req, res, next) => 
  {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error, favorited recipes, created recipes
    var error = '';
    var id = -1;
    var fn = '';
    var ln = '';
    var email = '';
    var fav = [];

    const { login, password } = req.body;
    const user = await User.findOne({login:login,password:password});
    console.log(user);
    if(user){
      id = user._id;
      console.log("Id from login is: "+id);
      fn = user.firstName;
      email = user.email;
      ln = user.lastName;
      fav = user.favorites;
      error = "Success!";
      try
      {
        const token = require("./createJWT.js");
        ret = token.createToken( fn, ln, id, email, fav );
      }
      catch(e)
      {
        //ret = {error:e.message};
        ret = res.status(500);
      }
    }else{
      ret = {error:"Login/Password incorrect"};
    }

    // var ret = { id:id, firstName:fn, lastName:ln, email:email, login: login, favorites:fav, error:error};
    

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    
    res.status(200).json(ret);
  });

  app.post('/api/getUser', async (req, res, next) => 
  {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error, favorited recipes, created recipes
    var error = '';
    var id = -1;
    var fn = '';
    var ln = '';
    var email = '';
    var login = '';
    var fav = [];

    const { userId } = req.body;
    const user = await User.findOne({_id:userId});
    console.log(user);
    if(user){
      id = user._id;
      console.log("Id from login is: "+id);
      fn = user.firstName;
      email = user.email;
      ln = user.lastName;
      fav = user.favorites;
      login = user.login;
      error = "Success!";
      try
      {
        const token = require("./createJWT.js");
        ret = token.createToken( fn, ln, id, email, fav );
      }
      catch(e)
      {
        //ret = {error:e.message};
        ret = res.status(500);
      }

    }

    var ret = { id:id, firstName:fn, lastName:ln, email:email, login: login, favorites:fav, error:error};
    

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    
    res.status(200).json(ret);
  });

  app.post('/api/register', async (req, res, next) => 
  {
    // incoming: firstName, lastName, email, login, password, createdRecipes, favoriteRecipes
    // outgoing: if success or error
    var error = '';
    const { firstName, lastName, email, login, password } = req.body;
    const checkUserExists = await User.findOne({login:login});
    if(checkUserExists){
      error = 'exists';
      res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }
    const newUser = new User({firstName:firstName, lastName:lastName, email:email, login:login,password:password, favorites:[]});
    try{
      newUser.save();
      error = 'success';
    }
    catch(e)
    {
      error = e.toString();
    }
    var ret = { error: error };
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    res.status(200).json(ret);
  });

  app.post('/api/forgotPassword', async (req, res, next) => 
  {
    console.log("Getting hre");
    // incoming: email
    // outgoing: message
    let error = '';
    var id = -1;
    var fn = '';
    var ln = '';
    var fav = [];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

    const { email,login } = req.body;
    const user = await User.findOne({email:email,login:login});

    if(user){
      console.log(user);
      error = 'success';
    }
    else{
      return res.status(404).json({ error: "Email not found" });
    }

    let ret = { error: error };

    mailOptions.text = 'You are receiving this because you have requested the password for your account.\n\n' + "Current Password: " + user.password;
    mailOptions.to = user.email;
    mailOptions.subject = 'Password Reminder';

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        res.status(200).json(ret);
      }
    });
  });

  app.post('/api/verifyEmail', async (req, res, next) => 
  {
    // incoming: email
    // outgoing: message
    let error = '';
    var id = -1;
    var fn = '';
    var ln = '';
    var fav = [];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

    const { email, emailCode } = req.body;

    if(email){
      error = 'success';
    }
    else{
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    let ret = { error: error, emailCode: emailCode };

    mailOptions.subject = "Email Verification";
    mailOptions.text = "Here is the code to verify your email: " + emailCode;
    mailOptions.to = email;

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        res.status(200).json(ret);
      }
    });
  });

  app.post('/api/addrecipe', async (req, res, next) =>
  {
    // incoming: userId, color
    // outgoing: error
    const { name, minutes, submitted, tags, nutrition, n_steps, steps, description, ingredients, n_ingredients, createdby} = req.body;
   // name = req.body.name;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

    /*
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
    */

    const newRecipe = new Recipe({Name:name, Minutes:minutes, Submitted:submitted, Tags:tags, Nutrition:nutrition, N_Steps:n_steps, Steps:steps, Description:description, Ingredients:ingredients, N_Ingredients:n_ingredients, CreatedBy:createdby});
    var error = '';
    console.log("New recipe is: "+newRecipe);

    try
    {
      // const db = client.db("paradise_kitchen");
      // const result = db.collection('recipes').insertOne(newRecipe);
      newRecipe.save();
      error = "success";
    }
    catch(e)
    {
      error = e.toString();
    }

    /*
    var refreshedToken = null;

    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }

    */
    var ret = { error: error};
    res.status(200).json(ret);
  });

  app.post('/api/readrecipe', async (req, res, next) =>
  {
    const {id, jwtToken} = req.body;

    //console.log(JSON.stringify(req.body));
    const regex = {"$regex": id};
    const readRecipe = await Recipe.findById(id);
    console.log(readRecipe);
    var error = '';
    try
    {
      if(readRecipe != null){
        error = "read success";
        var ret = {id: readRecipe._id, name: readRecipe.Name, minutes: readRecipe.Minutes, submitted: readRecipe.Submitted, tags: readRecipe.Tags, nutrition: readRecipe.Nutrition, n_steps: readRecipe.N_Steps, steps: readRecipe.Steps, 
          description: readRecipe.Description, ingredients: readRecipe.Ingredients, n_ingredients: readRecipe.N_Ingredients, createdby: readRecipe.CreatedBy, error: error};
      }
      else{
        error = "read fail";
        var ret = {error:error};
      }
    }
    catch(e)
    {
      error = e.toString();
      var ret = { error: error, jwtToken: refreshedToken };
    }

    var refreshedToken = null;

    
    res.status(200).json(ret);
  });

  app.post('/api/searchrecipe', async (req, res, next) =>
  {
    const {text, jwtToken} = req.body;

    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    
    const regex = {"$regex": text, "$options": "i"};
    const searchRecipe = await Recipe.find({$or:[
        {Name:regex},
        {Tags:regex},
        {Description:regex},
        {Ingredients:regex},
      ]});
    console.log(searchRecipe);
    var error = '';
    try
    {
      if(searchRecipe.length > 0){
        error = "search success";
        var ret = [];
        for(var i = 0; i < searchRecipe.length; i++){
          ret[i] = {id: searchRecipe[i]._id, name: searchRecipe[i].Name, minutes: searchRecipe[i].Minutes, submitted: searchRecipe[i].Submitted, tags: searchRecipe[i].Tags, nutrition: searchRecipe[i].Nutrition, n_steps: searchRecipe[i].N_Steps, steps: searchRecipe[i].Steps, 
            description: searchRecipe[i].Description, shortDescription:truncate(searchRecipe[i].Description, 80),  ingredients: searchRecipe[i].Ingredients, n_ingredients: searchRecipe[i].N_Ingredients, createdby: searchRecipe[i].CreatedBy, error: error};
        }
        
      }
      else{
        error = "search fail";
        var ret = {error:error};
      }
    }
    catch(e)
    {
      error = e.toString();
      var ret = { error: error, jwtToken: refreshedToken };
    }

    var refreshedToken = null;

    
    res.status(200).json(ret);
  });

  function truncate(str, num) {
    if (num > str.length){
      return str;
    } else{
      str = str.substring(0,num);
      return str+"...";
    }
  }

  app.post('/api/updaterecipe', async (req, res, next) =>
  {
    const {id, name, minutes, submitted, tags, nutrition, n_steps, steps, description, ingredients, n_ingredients, createdby, jwtToken } = req.body;
    //console.log(JSON.stringify(req.body));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

    const updateRecipe = await Recipe.findByIdAndUpdate(id, {$set: {Name: name, Minutes: minutes, Submitted: submitted, Tags: tags, Nutrition: nutrition, N_Steps: n_steps, 
      Steps: steps, Description: description, Ingredients: ingredients, N_Ingredients: n_ingredients, CreatedBy: createdby}}, {new: true});
    var error = '';

    if(updateRecipe != null)
    {
      try
      {
        //console.log();
        error = "update success";
        var ret = {id: updateRecipe._id, name: updateRecipe.Name, minutes: updateRecipe.Minutes, submitted: updateRecipe.Submitted, tags: updateRecipe.Tags, nutrition: updateRecipe.Nutrition, n_steps: updateRecipe.N_Steps, steps: updateRecipe.Steps, 
          description: updateRecipe.Description, ingredients: updateRecipe.Ingredients, n_ingredients: updateRecipe.N_Ingredients, createdby: updateRecipe.CreatedBy, error: error};
      }
      catch(e)
      {
        error = e.toString();
        var ret = { error: error, jwtToken: refreshedToken };
      }
  }
  else
    error = "update failed";

    var refreshedToken = null;

    res.status(200).json(ret);
  });

  app.post('/api/deleterecipe', async (req, res, next) =>
  {
    const {id, jwtToken } = req.body;
    //console.log(JSON.stringify(req.body));

    const deleteRecipe = await Recipe.findByIdAndRemove(id);
    const usersFavorited = await User.find({favorites : id});
    console.log(usersFavorited);

    if(usersFavorited.length>0){
      for(let i=0;i<usersFavorited.length;i++){
        const removeFavorite = await User.findByIdAndUpdate(usersFavorited[i]._id, {$pull: {favorites: id}});
        if(removeFavorite){
          console.log('Remove Favorite Successful');
        }else{
          console.log('Remove Favorite Unsuccessful');
        }
      }
    } 
    var error = '';

    if(deleteRecipe)
    {
      try
      {
        //console.log();

        error = "delete success";
        var ret = {error: error, jwtToken: refreshedToken};
      }
      catch(e)
      {
        error = e.toString();
        var ret = { error: error, jwtToken: refreshedToken };
      }
  }
  else
  {
    error = "delete failed";
    var ret = { error: error, jwtToken: refreshedToken };
  }
    var refreshedToken = null;

    res.status(200).json(ret);
  });

  app.post('/api/showfavorites', async (req, res, next) =>
  {
    const {userId, jwtToken} = req.body;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

    const user = await User.findById(userId);
    const favoriteIds = user.favorites;
    const favorites = [];

    for(var i = 0; i < favoriteIds.length; i++){
      favorites.push(await Recipe.findById(favoriteIds[i]));
    }

    var error = '';
    
    try
    {
      if(favorites.length > 0){
        error = "show favorites success";
        var ret = [];
        for(var i = 0; i < favorites.length; i++){
          ret[i] = {id: favorites[i]._id, name: favorites[i].Name, minutes: favorites[i].Minutes, submitted: favorites[i].Submitted, tags: favorites[i].Tags, nutrition: favorites[i].Nutrition, n_steps: favorites[i].N_Steps, steps: favorites[i].Steps, 
            description: favorites[i].Description, shortDescription: truncate(favorites[i].Description, 80), ingredients: favorites[i].Ingredients, n_ingredients: favorites[i].N_Ingredients, createdby: favorites[i].CreatedBy, error: error};
        }
        
      }
      else{
        error = "show favorites fail";
        var ret = {error:error};
      }
    }
    catch(e)
    {
      error = e.toString();
      var ret = { error: error, jwtToken: refreshedToken };
    }

    var refreshedToken = null;

    
    res.status(200).json(ret);
  });

  app.post('/api/showCreated', async (req, res, next) =>
  {
    const {userId, jwtToken} = req.body;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    const createdRecipes = await Recipe.find({CreatedBy:userId});
    var error = '';
    try
    {
      if(createdRecipes.length > 0){
        error = "created pull success";
        var ret = [];
        for(var i = 0; i < createdRecipes.length; i++){
          ret[i] = {id: createdRecipes[i]._id, name: createdRecipes[i].Name, minutes: createdRecipes[i].Minutes, submitted: createdRecipes[i].Submitted, tags: createdRecipes[i].Tags, nutrition: createdRecipes[i].Nutrition, n_steps: createdRecipes[i].N_Steps, steps: createdRecipes[i].Steps, 
            description: createdRecipes[i].Description, shortDescription: truncate(createdRecipes[i].Description, 80),  ingredients: createdRecipes[i].Ingredients, n_ingredients: createdRecipes[i].N_Ingredients, createdby: createdRecipes[i].CreatedBy, error: error};
        }
        
      }
      else{
        error = "created pull fail";
        var ret = {error:error};
      }
    }
    catch(e)
    {
      error = e.toString();
      var ret = { error: error, jwtToken: refreshedToken };
    }

    var refreshedToken = null;

    
    res.status(200).json(ret);
  });

  app.post('/api/addfavorite', async (req, res, next) =>
  {
    const {userId, recipeId, jwtToken } = req.body;
    //console.log(JSON.stringify(req.body));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

    const addFavorite = await User.findByIdAndUpdate(userId, {$addToSet: {favorites: recipeId}});
    var error = '';
    if(recipeId != null)
    {
      try
      {
        //console.log();
        error = "add favorite success";
        var ret = {error: error, jwtToken: refreshedToken};
      }
      catch(e)
      {
        error = e.toString();
        var ret = { error: error, jwtToken: refreshedToken };
      }
  }
  else
  {
    error = "add favorite failed";
    var ret = { error: error, jwtToken: refreshedToken };
  }
    var refreshedToken = null;

    res.status(200).json(ret);
  });


  app.post('/api/removefavorite', async (req, res, next) =>
  {
    const {userId, recipeId, jwtToken } = req.body;
    //console.log(JSON.stringify(req.body));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

    const removeFavorite = await User.findByIdAndUpdate(userId, {$pull: {favorites: recipeId}});
    var error = '';
    if(recipeId != null)
    {
      try
      {
        //console.log();
        error = "remove favorite success";
        var ret = {error: error, jwtToken: refreshedToken};
      }
      catch(e)
      {
        error = e.toString();
        var ret = { error: error, jwtToken: refreshedToken };
      }
  }
  else
  {
    error = "remove favorite failed";
    var ret = { error: error, jwtToken: refreshedToken };
  }
    var refreshedToken = null;

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
