import React from "react";
import '../css/Search.css';

 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="popbox">
         {props.content}
        <button id="PopupButton">Save Recipe</button>
        <button id="PopupCloseButton" onClick={props.handleClose}>Return</button>
      </div>
    </div>
  );
};
 
export default Popup;
