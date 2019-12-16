import React, { useState } from "react";
import Button from "./Button";
import { uuid } from "uuidv4";

const Form = props => {
  const { addMessageToArray } = props;
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [dateCreated, setDateCreated] = useState("");

  const handleChange = e => {
    setMessage(e.target.value);
    const messageId = uuid();
    const date = new Date();
    setId(messageId);
    setDateCreated(date.getTime());
    setAuthor("Jonathan Grossman");
  };

  const submitMessage = () => {
    if (message.length <= 140 && message.length > 0) {
      addMessageToArray({ author, message, id, dateCreated });
    }
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
