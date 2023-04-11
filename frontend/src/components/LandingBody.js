import React from 'react';
import '../css/Landing.css'

function SearchRecipes(){
    window.location.href = '/search';
}

function ViewRecipes(){
    window.location.href = '/view';
}

function CreateRecipes(){
    window.location.href = '/create';
}

function ViewProfile(){
    window.location.href = '/profile';
}

function PageTitle()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

   return(
        <center className='HomePageBox'>
                <h1 id="HomePageWords">
                    Welcome, {firstName} {lastName}!
                </h1>

                <div id="SearchRecipesWords">Search for new recipes</div>
                <button type="button" id="SearchRecipesButton" class="buttons" onClick={SearchRecipes}> Search Recipes </button>


                <div id="YourRecipesWords">Check out your recipes</div>
                <button type="button" id="YourRecipesButton" class="buttons" onClick={ViewRecipes}> Your Recipes </button>


                <div id="CreateRecipesWords">Create your own recipes</div>
                <button type="button" id="CreateRecipesButton" class="buttons" onClick={CreateRecipes}> Create Recipes </button>


                <div id="YourProfileWords">Check out your profile</div>
                <button type="button" id="YourprofileButton" class="buttons" onClick={ViewProfile}> Profile Page </button>

                
        </center>
   );
};
export default PageTitle;
