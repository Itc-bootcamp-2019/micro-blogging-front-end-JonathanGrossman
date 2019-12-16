import React, { useState } from "react";
import Button from "./Button";

const Form = () => {
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const submitMessage = () => {
    // pass this.state.message to home in a props function from home that puts message in the messages array
    console.log(message);
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
