import React, { useState } from "react";
import Button from "./Button";

const Form = props => {
  const { addMessageToArray } = props;
  const [author, setAuthor] = useState("Jonathan Grossman");
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const submitMessage = () => {
    addMessageToArray({ author, message });
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
