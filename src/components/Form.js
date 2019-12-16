import React, { useState } from "react";
import Button from "./Button";
import { uuid } from "uuidv4";

const Form = props => {
  const { addMessageToArray } = props;
  const [author, setAuthor] = useState("Jonathan Grossman");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");

  const handleChange = e => {
    setMessage(e.target.value);
    const messageId = uuid();
    setId(messageId);
  };

  const submitMessage = () => {
    addMessageToArray({ author, message, id });
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
        />
      </div>
    </div>
  );
};

export default Form;
