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
    errorMessage,
    userName
  } = props;
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const handleChange = e => {
    const date = new Date();
    setContent(e.target.value);
    setDate(date.toISOString());
    validateInput();
  };
  const toggleButtonAppearance = () => {
    if (isSpinning) {
      return <Spinner />;
    } else {
      return (
        <Button
          type="Tweet"
          submitInput={submitMessage.bind(this)}
          message={content}
          isInputValid={isInputValid}
        />
      );
    }
  };
  const validateInput = () => {
    if (content.length > 140 || content.length < 1) {
      setInputValidity(false);
    } else {
      setInputValidity(true);
    }
  };
  const submitMessage = () => {
    if (isInputValid) {
      addMessageToArray({ date, userName, content });
      setContent("");
    }
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
      <div className="message-button-home">{toggleButtonAppearance()}</div>
    </div>
  );
};

export default Form;
