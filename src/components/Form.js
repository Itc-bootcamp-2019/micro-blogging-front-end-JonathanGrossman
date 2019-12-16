import React from "react";
import Button from "./Button";

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form">
        <textarea
          placeholder="What do you have in mind?"
          className="form-input"
        >
          {/* <textarea
          
          className="message-input"
        ></textarea> */}
        </textarea>
        <div className="message-button-home">
          <Button type="Tweet" />
        </div>
      </div>
    );
  }
}

export default Form;
