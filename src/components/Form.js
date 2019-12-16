import React from "react";
import Button from "./Button";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  submitMessage = () => {
    // pass this.state.message to home in a props function from home that puts message in the messages array
    console.log(this.state.message);
  };

  render() {
    const { message } = this.state;
    return (
      <div className="form">
        <textarea
          placeholder="What do you have in mind?"
          className="form-input"
          onChange={e => this.handleChange(e)}
          value={message}
        ></textarea>
        <div className="message-button-home">
          <Button
            type="Tweet"
            submitMessage={this.submitMessage.bind(this)}
            message={message}
          />
        </div>
      </div>
    );
  }
}

export default Form;
