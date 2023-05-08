import React, { useState } from 'react';
import "../../styles/confirmationForm.css"

function ConfirmationPopup({ message, onYes, onNo }) {

  return (
    <div className="ConfirmationPopupContainer">
      <div className="ConfirmationPopup">
        <p>{message}</p>
        <div className="ConfirmationButtons">
          <button onClick={onYes}>Yes</button>
          <button onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;