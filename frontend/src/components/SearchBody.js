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
   var data = [];
   var firstsearch = 0;

   const doSearch = async event =>{
   
    SearchValue = document.getElementById("SearchInput").value;

    
    event.preventDefault();
    var obj = {text: SearchInput.value};
    var js = JSON.stringify(obj);
    console.log("This is JSON: " + js);
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
        console.log("Response is: " , response);

        if (res.status == 500)
        {
            setMessage('User/Password combination incorrect');
        }
        else if(res.id == -1){
            console.log("Here");
            setMessage('User/Password combination incorrect');
        }
        else{
            data = res;
            console.log(data);


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
            for(var j = 0; j<columnlength; j++){ //columns

               if(k == data.length){
                   return;
               }

              console.log(columnlength);
              var cell = row.insertCell(j);
              cell.innerHTML = "<button class='RecipeBox' id = " + k + "> " + data[k].name + " </button>";
              cell.onclick = fillPopup && togglePopup;
              k++;
          }
     }
   }

   const [isOpen, setIsOpen] = useState(false);


   var PopUpTitle;
   // PopUpTitle = data[this.id].name;


   const fillPopup = async event => {

         $("button").click(function() {
             PopUpTitle = data[this.id].name;
             console.log(PopUpTitle); 
         });

   }


   const togglePopup = async event => {
    console.log(PopUpTitle);
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
                {isOpen && <Popup content={<>
                    <b>Name of Recipe goes here</b>
                    <p>Tags: -------------------------------------------------</p>
                    <p> -</p>
                    <p>Minutes: -----------  N_ingredients: ----- ----  N_Steps: ----- </p>
                    <p>Description: -------------------------------------------------</p>
                    <p> -</p>
                    <p>Ingredients List: ---------------     Nutrition: ----------</p>
                    <p> -</p>
                    <p>Steps: -------------------------------------------------</p>

                     </>}
                handleClose={togglePopup}/>}
            </div>
            
        </center>
   );
};
export default PageTitle;
