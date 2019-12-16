import React, { useState, useEffect } from "react";

const Button = props => {
  const [buttonClass, setButtonClass] = useState(
    "button message-button-home submit-button-off"
  );

  useEffect(() => {
    applyClass();
  });

  const { type, submitMessage, isInputValid } = props;

  const applyClass = () => {
    if (isInputValid && type === "Tweet") {
      setButtonClass("button message-button-home submit-button-on");
    } else if (!isInputValid && type === "Tweet") {
      setButtonClass("button message-button-home submit-button-off");
    } else {
      setButtonClass("button message-button-home");
    }
  };
  return (
    <div
      className={buttonClass}
      onClick={submitMessage}
      disabled={!isInputValid}
    >
      {type}
    </div>
  );
};

export default Button;
