import React, { useState } from "react";
import Button from "./Button";
import { uuid } from "uuidv4";

const Form = props => {
  const { addMessageToArray } = props;
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [isInputValid, setInputValidity] = useState(false);

  const handleChange = e => {
    const messageId = uuid();
    const date = new Date();
    setMessage(e.target.value);
    setId(messageId);
    setDateCreated(date.getTime());
    setAuthor("Jonathan Grossman");
    validateInput();
  };
  const validateInput = () => {
    localStorage.clear();
    if (message.length > 140 || message.length < 1) {
      setInputValidity(false);
    } else {
      setInputValidity(true);
    }
  };

  const submitMessage = () => {
    isInputValid && addMessageToArray({ author, message, id, dateCreated });
  };
  return (
    <div className="form">
      <textarea
        placeholder="What do you have in mind?"
        className="form-input"
        onChange={e => handleChange(e)}
        value={message}
      ></textarea>
      <div className="message-button-home">
        <Button
          type="Tweet"
          submitMessage={submitMessage.bind(this)}
          message={message}
          isInputValid={isInputValid}
        />
      </div>
    </div>
  );
};

export default Form;
