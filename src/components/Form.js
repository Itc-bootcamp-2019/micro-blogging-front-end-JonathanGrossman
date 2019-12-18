import React, { useContext } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import Alert from "./Alert";
import AppContext from "../context/AppContext";

const Form = () => {
  const appContext = useContext(AppContext);

  const handleChange = e => {
    const date = new Date();
    appContext.setContent(e.target.value);
    appContext.setDate(date.toISOString());
    validateInput();
  };
  const toggleButtonAppearance = () => {
    if (appContext.isSpinning) {
      return <Spinner />;
    } else {
      return <Button type="Tweet" />;
    }
  };
  const validateInput = () => {
    if (appContext.content.length > 140 || appContext.content.length < 1) {
      appContext.setInputValidity(false);
    } else {
      appContext.setInputValidity(true);
    }
  };

  return (
    <div className="form">
      <div>
        {appContext.isError && (
          <Alert type="Error" />
        )}
      </div>
      <textarea
        placeholder="What do you have in mind?"
        className="form-input"
        onChange={e => handleChange(e)}
        value={appContext.content}
      ></textarea>
      <div className="message-button-home">{toggleButtonAppearance()}</div>
    </div>
  );
};

export default Form;
