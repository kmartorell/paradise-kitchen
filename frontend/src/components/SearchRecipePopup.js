import React from "react";
import '../css/Search.css';
 
const Popup = props => {

  function addedtofav() {
    document.getElementById("PopupButton").innerHTML = "Added!";
  }

  return (
    <div className="popup-box">
      <div className="popbox">
         {props.content}
        <button id="PopupEditButton" onClick={props.EditRecipe1}>Edit Recipe</button>
        <button id="PopupButton" onClick={() => {props.AddRecipe(); addedtofav()}}>Favorite Recipe</button>
        <button id="PopupCloseButton" onClick={props.handleClose}>Return</button>
        <button id="PopupDeleteButton" onClick={props.DeleteRecipe1}>Delete Recipe</button>
      </div>
    </div>
  );
};
 
export default Popup;
