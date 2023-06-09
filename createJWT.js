const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.createToken = function ( fn, ln, id, em, fav, login )
{
  return _createToken( fn, ln, id, em, fav, login );
}
_createToken = function ( fn, ln, id, em, fav, login )
{
  try
  {
    const expiration = new Date();
    const user = {userId:id,firstName:fn,lastName:ln, email:em, favorites:fav, login:login };
    const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m'});
    // In order to expire with a value other than the default, use the
    // following
    /*
    const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m'} );
    '24h'
    '365d'
    */
    var ret = {accessToken:accessToken};
  }
  catch(e)
  {
    var ret = {error:e.message};
  }
  return ret;
}

exports.isExpired = function( token )
{
  var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET,
  (err, verifiedJwt) =>
  {
    if( err )
    {
      return true;
    }
      else
    {
      return false;
    }
  });
  return isError;
  }

exports.refresh = function( token )
{
  var ud = jwt.decode(token,{complete:true});
  var userId = ud.payload.id;
  var login = ud.payload.login;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;
  var email = ud.payload.email;
  var favorites = ud.payload.favorites;
  return _createToken( firstName, lastName, userId, email, favorites, login);
}

exports.decode = function( token )
{
  return jwt.decode(token,{complete:true});
}