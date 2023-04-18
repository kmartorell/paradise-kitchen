import React from "react";
import '../css/View.css';
import './SearchBody.js';

 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="popbox">
         {props.content}
        <button id="Popup1EditButton" onClick={props.EditRecipe2}>Edit Recipe</button>
        <button id="Popup1Button" onClick={props.RemoveRecipe2}>UnFavorite Recipe</button>
        <button id="Popup1CloseButton" onClick={props.handleClose2}>Return</button>
        <button id="Popup1DeleteButton" onClick={props.DeleteRecipe2}>Delete Recipe</button> 
      </div>
    </div>
  );
};
 
export default Popup;
