import React from "react";
import '../css/View.css';
import './SearchBody.js';

 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="popbox">
         {props.content}
        <button id="PopupButton" onClick={props.RemoveRecipe2}>UnFavorite Recipe</button>
        <button id="PopupCloseButton" onClick={props.handleClose2}>Return</button>
      </div>
    </div>
  );
};
 
export default Popup;
