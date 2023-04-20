import React,{ useState } from 'react';
import '../css/Create.css'
import axios from 'axios'

function PageTitle()
{

    const [tags, setTags] = useState(['']);
  const [nutritionInfo, setNutritionInfo] = useState(['']);
  const [stepsInfo, setStepsInfo] = useState(['']);
  const [ingredientsInfo, setIngredientsInfo] = useState(['']);

  const handleTagChange = (index, event) => {
    const values = [...tags];
    values[index] = event.target.value;
    setTags(values);
  };

  const handleNutritionInfoChange = (index, event) => {
    const values = [...nutritionInfo];
    values[index] = event.target.value;
    setNutritionInfo(values);
  };

  const handleStepsChange = (index, event) => {
    const values = [...stepsInfo];
    values[index] = event.target.value;
    setStepsInfo(values);
  }; 

  const handleIngredientsChange = (index, event) => {
    const values = [...ingredientsInfo];
    values[index] = event.target.value;
    setIngredientsInfo(values);
  }; 

  const handleAddTag = () => {
    const values = [...tags];
    values.push('');
    setTags(values);
    console.log("Tag Values: "+values);
    console.log(tags);
  };

  const handleAddNutritionInfo = () => {
    const values = [...nutritionInfo];
    values.push('');
    setNutritionInfo(values);
  };

  const handleStepsInfo = () => {
    const values = [...stepsInfo];
    values.push('');
    setStepsInfo(values);
  };

  const handleIngredientsInfo = () => {
    const values = [...ingredientsInfo];
    values.push('');
    setIngredientsInfo(values);
  };

  const handleRemoveTag = () => {
    const values = [...tags];
    values.pop();
    setTags(values);
  };

  const handleRemoveNutritionFacts = () => {
    const values = [...nutritionInfo];
    values.pop();
    setNutritionInfo(values);
  };

  const handleRemoveSteps = () => {
    const values = [...stepsInfo];
    values.pop();
    setStepsInfo(values);
  };

  const handleRemoveIngredients = () => {
    const values = [...ingredientsInfo];
    values.pop();
    setIngredientsInfo(values);
  };

  

  const doAddRecipe = async event =>{
    console.log("In Add Recipe");
    event.preventDefault();
    console.log("made it in doAddRecipe");

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    const date = new Date();
    const noSteps = stepsInfo.length;
    const noIngredients = ingredientsInfo.length;

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    console.log("Userid is: "+ud.id);
    var userId = ud.id;
    console.log("Type of id is: "+typeof(userId));

    let tempMinutes = Number(document.getElementById("recipeMinutes").value);



    const newRecipe = { 
    name: document.getElementById("recipeName").value,  
    minutes: tempMinutes,
    submitted: date,
    tags: tags,
    nutrition: nutritionInfo,
    n_steps: noSteps,
    steps: stepsInfo,
    description: document.getElementById("recipeDescription").value,
    ingredients: ingredientsInfo,
    n_ingredients: noIngredients,
    createdby: userId,
    }

    let isEmptyField = false;
    if(newRecipe.Name == ''){
        document.getElementById('recipeName').placeholder = "Please enter a name!";
        document.getElementById('recipeName').style.borderColor = "red";
        isEmptyField = true;
    }else {
        document.getElementById('recipeName').style.borderColor = "green";
    }

    if(document.getElementById("recipeMinutes").value == ''){
        document.getElementById("recipeMinutes").placeholder='Please enter the minutes!';
        document.getElementById('recipeMinutes').style.borderColor = "red";
        isEmptyField = true;
    }else {
        document.getElementById('recipeMinutes').style.borderColor = "green";
    }
    
    for(let i = 0; i<tags.length;i++){
        if(tags[i] == ''){
            document.getElementById("recipeTag"+i).placeholder='Please enter a tag!';
            document.getElementById("recipeTag"+i).style.borderColor = "red";
            isEmptyField = true;
        }
    }

    for(let i = 0; i<nutritionInfo.length;i++){
        if(nutritionInfo[i] == ''){
            document.getElementById("recipeNutrition"+i).placeholder='Please enter nutrition fact!';
            document.getElementById("recipeNutrition"+i).style.borderColor = "red";
            isEmptyField = true;
        }
    }

    for(let i = 0; i<stepsInfo.length;i++){
        if(stepsInfo[i] == ''){
            document.getElementById("recipeSteps"+i).placeholder='Please enter a step!';
            document.getElementById("recipeSteps"+i).style.borderColor = "red";
            isEmptyField = true;
        }
    }

    for(let i = 0; i<ingredientsInfo.length;i++){
        if(ingredientsInfo[i] == ''){
            document.getElementById("recipeIngredients"+i).placeholder='Please enter an ingredient!';
            document.getElementById("recipeIngredients"+i).style.borderColor = "red";
            isEmptyField = true;
        }
    }
    if(newRecipe.Description == ''){
        document.getElementById("recipeDescription").placeholder='Please enter an email!';
        document.getElementById('recipeDescription').style.borderColor = "red";
        isEmptyField = true;
    }else {
        document.getElementById('recipeDescription').style.borderColor = "green";
    }

    if(isEmptyField){
        return;
    }

        let js = JSON.stringify(newRecipe);
        console.log("This is JSON: " + js);

        let config =
        {
            method: 'post',
            url: bp.buildPath('api/addrecipe'),
            headers:
            {
            'Content-Type': 'application/json'
            },
            data: js
        };
        console.log(config);
        axios(config)
        .then(function (response)
        {
            var res = response.data;
            console.log("Response is: " , response);
            console.log("Response data is: "+res);

            if (res.error != 'success')
            {
                console.log("Failed to add recipe.");
            }
            else
            {
                storage.storeToken(res);
                console.log("User successfully added recipe.");
                window.location.href = '/landing';
            }
        })

        .catch(function (error)
        {
            console.log(error);
        });
        
}

   return(
        <center className='HomePageBox1'>
                <h1 id="HomePageWords">
                    Create New Recipe!
                </h1>
                <span class="text" id="addRecipeResult"></span>
                <div id="register" class="input-group register-input" action="">
                    <div className='RecipeName'>
                        <label htmlFor="recipeName"><strong>Recipe Name</strong></label>
                        <input type="text" name="recipeName" id="recipeName" placeholder="Avocado Toast"/>
                    </div>
                    
                    <div className='RecipeMinutes'>
                        <label htmlFor="recipeMinutes"><strong>Minutes to Make</strong></label>
                        <input type="text" name="recipeMinutes" id="recipeMinutes" placeholder="45"/>
                    </div>
                    
                    <div className='tags'>
                        <label htmlFor="tags"><strong>Tags</strong></label>
                        {tags.map((tag, index) => (
                            <input
                            key={index}
                            type="text"
                            name={`recipeTag${index}`}
                            id={`recipeTag${index}`}
                            placeholder="Enter a tag"
                            value={tag}
                            onChange={(event) => handleTagChange(index, event)}
                            />
                        ))}
                        <button type="button" class="increase"onClick={handleAddTag}>Add Tag</button>
                        <button type="button" class="decrease"onClick={handleRemoveTag}>Remove Tag</button>
                    </div>
                    
                    <div className='nutritionFacts'>
                        <label htmlFor="nutritionInfo"><strong>Nutrition Information</strong></label>
                        {nutritionInfo.map((info, index) => (
                            <input
                            key={index}
                            type="text"
                            name={`recipeNutrition${index}`}
                            id={`recipeNutrition${index}`}
                            placeholder="Enter nutrition info"
                            value={info}
                            onChange={(event) => handleNutritionInfoChange(index, event)}
                            />
                        ))}
                        <button type="button" class="increase"onClick={handleAddNutritionInfo}>Add Nutrition Info</button>
                        <button type="button" class="decrease"onClick={handleRemoveNutritionFacts}>Remove Nutrition Info</button>
                    </div>

                    <div className='stepsFacts'>
                        <label htmlFor="stepsInfo"><strong>Recipe Steps</strong></label>
                        {stepsInfo.map((info, index) => (
                            <input
                            key={index}
                            type="text"
                            name={`recipeSteps${index}`}
                            id={`recipeSteps${index}`}
                            placeholder="Enter new step"
                            value={info}
                            onChange={(event) => handleStepsChange(index, event)}
                            />
                        ))}
                        <button type="button" class="increase"onClick={handleStepsInfo}>Add Another Step</button>
                        <button type="button" class="decrease"onClick={handleRemoveSteps}>Remove Step</button>
                    </div>
                    <div className='ingredientsFacts'>
                        <label htmlFor="ingredientsInfo"><strong>Ingredients</strong></label>
                        {ingredientsInfo.map((info, index) => (
                            <input
                            key={index}
                            type="text"
                            name={`recipeIngredients${index}`}
                            id={`recipeIngredients${index}`}
                            placeholder="Enter new ingredient"
                            value={info}
                            onChange={(event) => handleIngredientsChange(index, event)}
                            />
                        ))}
                        <button type="button" class="increase"onClick={handleIngredientsInfo}>Add Another Ingredient</button>
                        <button type="button" class="decrease"onClick={handleRemoveIngredients}>Remove Ingredient</button>
                    </div>
                    <div className='RecipeDescription'>
                        <label htmlFor="recipeDescription"><strong>Recipe Description</strong></label>
                        <input type="text" name="recipeDescription" id="recipeDescription" placeholder="Write anything you would like others to know!"/>
                    </div>
                </div>
                <div id="registerButtonBox">
                        <input type="submit" value="Add Recipe" onClick={doAddRecipe} />
                </div>

        </center>
   );
};
export default PageTitle;
