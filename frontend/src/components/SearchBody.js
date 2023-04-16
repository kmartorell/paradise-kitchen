import React, { createElement, useState } from 'react';
import '../css/Search.css';
import axios from 'axios';
import $ from 'jquery';
import Popup from './RecipePopup.js'

function PageTitle()
{
   var bp = require('./Path.js');
   var storage = require('../tokenStorage.js');
   const [message,setMessage] = useState('');
   var SearchInput;
   var SearchValue;
   var data;

   const doSearch = async event =>{
   
    SearchValue = document.getElementById("SearchInput").value;

    
    event.preventDefault();
    var obj = {text: SearchInput.value};
    var js = JSON.stringify(obj);
    var config =
    {
        method: 'post',
        url: bp.buildPath('api/searchrecipe'),
        headers:
        {
        'Content-Type': 'application/json'
        },
        data: js
    };
    axios(config)
    .then(function (response)
    {
        var res = response.data;
       
        if (res.status == 500)
        {
            setMessage('incorrect');
        }
        else if(res.id == -1){
            console.log("Here");
            setMessage('incorrect');
        }
        else{
            
            data = res;
            console.log("--InDoSearch--");
            console.log(data);
            console.log("-----");


            if(data.error == "search fail"){
                alert("No recipes found!");
                return;
            }

            depopulatetable();
            populatetable();
        }


    }).catch(function (error)
    {
        console.log(error);
    });
   }


   const depopulatetable = async event => {
      $("#RecipeBoxes tbody tr").remove(); 
   }

   var idchecker = 0;
   const populatetable = async event=>{

         var table = document.getElementById("RecipeBoxes");
            
         var rowlength = data.length
  
         if(data.length > 4){
           rowlength = data.length/4;
           }

         var columnlength = 4;
            if(data.length <= 4){
            columnlength = data.length;
          }

         var k = 0;

         for(var i = 0; i<rowlength; i++){ //rows
             var row = table.insertRow(i);
             row.innerHTML = ""
            for(var j = 0; j<columnlength; j++){ //columns

               if(k == data.length){
                   return;
               }

              var cell = row.insertCell(j);
              cell.innerHTML = "<button class='RecipeBox' id = " + k + "> " + data[k].name + " </button>";
              cell.id = k;
              cell.className = "RecipeCell"
              cell.onclick = togglePopup;
             
              if(idchecker == 0){
                $(document).off("click", ".RecipeCell");
                $(document).on("click", ".RecipeCell", function(e) {
                  fillPopup(e); 
                })

                idchecker = 1;
              }
              k++;
          }
     }
   }

   function fillPopup(e){ // Use e.currentTarget.id to get the id of the button you want.
                          // Data[e.currentTarget.id] to get the object of the recipe

        console.log("+")
        console.log(data);
        console.log("+");
        document.getElementById("RecipeName").innerHTML = "";
        document.getElementById("RecipeName").innerHTML = data[e.currentTarget.id].name;


        document.getElementById("Tags").innerHTML = "";
        for(var i = 0; i<data[e.currentTarget.id].tags.length ; i++){
            if(i==0){
                document.getElementById("Tags").innerHTML += data[e.currentTarget.id].tags[i];
            }
            else{
                document.getElementById("Tags").innerHTML += " | " + data[e.currentTarget.id].tags[i];
            }
        }

        document.getElementById("Minutes").innerHTML = "";
        document.getElementById("Minutes").innerHTML = data[e.currentTarget.id].minutes;

        document.getElementById("N_ingredients").innerHTML ="";
        document.getElementById("N_ingredients").innerHTML = data[e.currentTarget.id].n_ingredients;

        document.getElementById("N_Steps").innerHTML = "";
        document.getElementById("N_Steps").innerHTML = data[e.currentTarget.id].n_steps;

        document.getElementById("Description").innerHTML = "";
        document.getElementById("Description").innerHTML = data[e.currentTarget.id].description;


        var k = 1;
        document.getElementById("Ingredients-List").innerHTML ="";
        for(var i = 0; i<data[e.currentTarget.id].ingredients.length ; i++){
            if(i==0){
                document.getElementById("Ingredients-List").innerHTML += "<b>" + k + "</b>" + ". " + data[e.currentTarget.id].ingredients[i] + "\n";
                k++;
            }
            else{
                document.getElementById("Ingredients-List").innerHTML += " " + "<b>" + k + "</b>" + ". " + data[e.currentTarget.id].ingredients[i] + "\n";
                k++;
            }
        }

        var k = 1;
        document.getElementById("Nutrition").innerHTML = "";
        for(var i = 0; i<data[e.currentTarget.id].nutrition.length ; i++){
            if(i==0){
                document.getElementById("Nutrition").innerHTML += "<b>" + k + "</b>" + ". " + data[e.currentTarget.id].nutrition[i] + "\n";
                k++;
            }
            else{
                document.getElementById("Nutrition").innerHTML += " " + "<b>" + k + "</b>" + ". " + data[e.currentTarget.id].nutrition[i] + "\n";
                k++;
            }
        }

        var k = 1;
        document.getElementById("Steps").innerHTML = "";
        for(var i = 0; i<data[e.currentTarget.id].steps.length ; i++){
            if(i==0){
                document.getElementById("Steps").innerHTML += "<b>" + k + "</b>" + ". " + data[e.currentTarget.id].steps[i] + "\n";
                k++;
            }
            else{
                document.getElementById("Steps").innerHTML += " " + "<b>" + k + "</b>" + ". " + data[e.currentTarget.id].steps[i] + "\n";
                k++;
            }
        }

   }

   const [isOpen, setIsOpen] = useState(false);

   const togglePopup = async event => {
     setIsOpen(!isOpen);
   }

   

   return(
        <center className='SearchPageBox'>
            <h1 id="SearchPageWords">
                Search Recipes Here!
            </h1>
            <div className="SearchInputArea">
               <input type="text" name="search" id="SearchInput" placeholder="Type in a Name, Description, Ingredient or Tag here, Click Search with nothing to see all." ref={(c) => SearchInput = c} />
               <button type="submit" id="SearchButton" value="Search" onClick={doSearch}> Search</button>
               <button type="submit" id="ResetButton" value="Search" onClick={depopulatetable}> Reset</button>
            </div>
            <div id="RecipeTable">
                <table id="RecipeBoxes">
                </table>
            </div>

            <div>
                {isOpen && <Popup content={ <div id="PopupContent">
                                            <b id="RecipeName"></b>
                                               <div id ="NonTitleContents">

                                                    <div id="TagsContent"> Tags: 
                                                        <p id="Tags"></p>
                                                    </div>

                                                <div id="FirstSeparator">
                                                    <div id="Tagsminutes"> Total Minutes:
                                                        <p id="Minutes"></p>
                                                    </div>

                                                    <div id="TagsN_ingredients"> N_ingredients:
                                                        <p id="N_ingredients"></p>
                                                    </div>

                                                    <div id="TagsN_Steps"> N_Steps:
                                                        <p id="N_Steps"></p>
                                                    </div>
                                                </div>   

                                                    <div id="TagsDescription"> Description:
                                                        <p id="Description"></p>
                                                    </div>

                                                <div id="SecondSeparator">

                                                    <div id="TagsIngredients-List"> Ingredients List:
                                                        <p id="Ingredients-List"></p>
                                                    </div>

                                                    <div id="TagsNutrition"> Nutrition:
                                                        <p id="Nutrition"></p>
                                                    </div>
                                                </div>

                                                    <div id="TagsSteps"> Steps:
                                                        <p id="Steps"></p>
                                                    </div>

                                                </div>    
                                            </div>}
                handleClose={togglePopup}/>}
            </div>
            
        </center>
   );
};
export default PageTitle;

