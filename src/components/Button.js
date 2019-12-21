import React, { useEffect, useContext } from "react";
import AppContext from "../context/AppContext";

const Button = props => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    applyClass();
  });

  const { type } = props;

  const applyClass = () => {
    if (appContext.isInputValid && type === "Tweet") {
      appContext.setButtonClass("message-button-home submit-button-on");
    } else if (!appContext.isInputValid && type === "Tweet") {
      appContext.setButtonClass("message-button-home submit-button-off");
    } else if (type === "Save") {
      appContext.setButtonClass("input-button-profile");
    }
  };

  return (
    <div>
      {type === "Tweet" && (
        <button
          className={"button " + appContext.buttonClass}
          onClick={appContext.submitMessage}
          disabled={!appContext.isInputValid}
        >
          {type}
        </button>
      )}
      {type === "Save" && (
        <button
          className={"button " + appContext.buttonClass}
          onClick={appContext.updateLocalStorage}
        >
          {type}
        </button>
      )}
    </div>
  );
};

export default Button;
