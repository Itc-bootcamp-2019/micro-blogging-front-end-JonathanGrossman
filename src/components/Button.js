import React, { useState, useEffect } from "react";

const Button = props => {
  const [buttonClass, setButtonClass] = useState(
    "button message-button-home submit-button-off"
  );

  useEffect(() => {
    applyClass();
  });

  const { type, submitInput, isInputValid } = props;

  const applyClass = () => {
    if (isInputValid && type === "Tweet") {
      setButtonClass("button message-button-home submit-button-on");
    } else if (!isInputValid && type === "Tweet") {
      setButtonClass("button message-button-home submit-button-off");
    } else if (type === "Save") {
      setButtonClass("button input-button-profile");
    }
  };

  const displayButton = () => {
    if (type === "Tweet") {
      return (
        <div
          className={buttonClass}
          onClick={submitInput}
          disabled={!isInputValid}
        >
          {type}
        </div>
      );
    } else if (type === "Save") {
      return (
        <div className={buttonClass} onClick={submitInput}>
          {type}
        </div>
      );
    }
  };

  return displayButton();
};

export default Button;
