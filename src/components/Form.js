import React, { useState } from "react";
import Button from "./Button";
// NOTE: THIS IS FOR LOCAL STORAGE
// import { uuid } from "uuidv4";

const Form = props => {
  // NOTE: THIS IS FOR LOCAL STORAGE
  // const [id, setId] = useState("");

  const { addMessageToArray } = props;
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [isInputValid, setInputValidity] = useState(false);

  const handleChange = e => {
    // NOTE: THIS IS FOR LOCAL STORAGE
    // const messageId = uuid();
    // setId(messageId);
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
    // NOTE: THIS IS FOR LOCAL STORAGE
    // isInputValid && addMessageToArray({ userName, content, id, date });
  };
  return (
    <div className="form">
      <textarea
        placeholder="What do you have in mind?"
        className="form-input"
        onChange={e => handleChange(e)}
        value={content}
      ></textarea>
      <div className="message-button-home">
        <Button
          type="Tweet"
          submitMessage={submitMessage.bind(this)}
          message={content}
          isInputValid={isInputValid}
        />
      </div>
    </div>
  );
};

export default Form;
