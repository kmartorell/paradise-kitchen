require('express');
require('mongodb');
//load user model
const User = require("./models/user.js");
//load recipe model
const Recipe = require("./models/recipes.js");
const { response } = require('express');

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
        ret = {error:e.message};
      }
    }

    var ret = { id:id, firstName:fn, lastName:ln, email:email, favorites:fav, error:error};
    res.status(200).json(ret);
  });

  app.post('/api/register', async (req, res, next) => 
  {
    // incoming: firstName, lastName, email, login, password, createdRecipes, favoriteRecipes
    // outgoing: if success or error
    var error = '';
    const { firstName, lastName, email, login, password } = req.body;
    const newUser = new User({firstName:firstName, lastName:lastName, email:email, login:login,password:password, favorites:[]});
    try{
      newUser.save();
      error = 'success'
    }
    catch(e)
    {
      error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
  });

  app.post('/api/addrecipe', async (req, res, next) =>
  {
    // incoming: userId, color
    // outgoing: error
    const { name, minutes, submitted, tags, nutrition, n_steps, steps, description, ingredients, n_ingredients, createdby, jwtToken } = req.body;

    // try
    // {
    //   if( token.isExpired(jwtToken))
    //   {
    //     var r = {error:'The JWT is no longer valid', jwtToken: ''};
    //     res.status(200).json(r);
    //     return;
    //   }
    // }
    // catch(e)
    // {
    //   console.log(e.message);
    // }

    const newRecipe = new Recipe({Name:name, Minutes:minutes, Submitted:submitted, Tags:tags, Nutrition:nutrition, N_Steps:n_steps, Steps:steps, Description:description, Ingredients:ingredients, N_Ingredients:n_ingredients, CreatedBy:createdby});
    var error = '';

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

    var refreshedToken = null;

    // try
    // {
    //   refreshedToken = token.refresh(jwtToken);
    // }
    // catch(e)
    // {
    //   console.log(e.message);
    // }

    var ret = { error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });

  app.post('/api/readrecipe', async (req, res, next) =>
  {
    const {name, jwtToken} = req.body;

    //console.log(JSON.stringify(req.body));
    const readRecipe = await Recipe.findOne({Name:{"$regex": '^' + name, "$options": "i"}});
    var error = '';

    try
    {
      if(readRecipe != null)
        error = "read success";
      else
        error = "read fail";
      var ret = {id: readRecipe._id, name: readRecipe.Name, minutes: readRecipe.Minutes, submitted: readRecipe.Submitted, tags: readRecipe.Tags, nutrition: readRecipe.Nutrition, n_steps: readRecipe.N_Steps, steps: readRecipe.Steps, 
        description: readRecipe.Description, ingredients: readRecipe.Ingredients, n_ingredients: readRecipe.N_Ingredients, createdby: readRecipe.CreatedBy, error: error};
    }
    catch(e)
    {
      error = e.toString();
      var ret = { error: error, jwtToken: refreshedToken };
    }

    var refreshedToken = null;

    
    res.status(200).json(ret);
  });

  app.post('/api/updaterecipe', async (req, res, next) =>
  {
    const {id, name, minutes, submitted, tags, nutrition, n_steps, steps, description, ingredients, n_ingredients, createdby, jwtToken } = req.body;
    //console.log(JSON.stringify(req.body));

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

  app.post('/api/addfavorite', async (req, res, next) =>
  {
    const {userId, recipeId, jwtToken } = req.body;
    //console.log(JSON.stringify(req.body));

    const addFavorite = await User.findByIdAndUpdate(userId, {$push: {favorites: recipeId}});
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
