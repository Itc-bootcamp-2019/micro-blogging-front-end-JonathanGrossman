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
      appContext.setButtonClass("button message-button-home submit-button-on");
    } else if (!appContext.isInputValid && type === "Tweet") {
      appContext.setButtonClass("button message-button-home submit-button-off");
    } else if (type === "Save") {
      appContext.setButtonClass("button input-button-profile");
    }
  };

  const displayButton = () => {
    if (type === "Tweet") {
      return (
        <div
          className={appContext.buttonClass}
          onClick={appContext.submitMessage}
          disabled={!appContext.isInputValid}
        >
          {type}
        </div>
      );
    } else if (type === "Save") {
      return (
        <div
          className={"button " + appContext.buttonClass}
          onClick={appContext.updateLocalStorage}
        >
          {type}
        </div>
      );
    }
  };

  return displayButton();
};

export default Button;
