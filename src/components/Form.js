import React, { useState } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import Alert from "./Alert";

const Form = props => {
  const {
    addMessageToArray,
    isInputValid,
    setInputValidity,
    isSpinning,
    isError,
    errorMessage
  } = props;
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const handleChange = e => {
    const date = new Date();
    setContent(e.target.value);
    setDate(date.toISOString());
    setUserName("Ron");
    validateInput();
  };
  const validateInput = () => {
    localStorage.clear();
    if (content.length > 140 || content.length < 1) {
      setInputValidity(false);
    } else {
      setInputValidity(true);
    }
  };
  const submitMessage = () => {
    isInputValid && addMessageToArray({ date, userName, content });
  };
  return (
    <div className="form">
      <div>{isError && <Alert errorMessage={errorMessage} />}</div>
      <textarea
        placeholder="What do you have in mind?"
        className="form-input"
        onChange={e => handleChange(e)}
        value={content}
      ></textarea>
      <div className="message-button-home">
        {isSpinning ? (
          <Spinner />
        ) : (
          <Button
            type="Tweet"
            submitMessage={submitMessage.bind(this)}
            message={content}
            isInputValid={isInputValid}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
