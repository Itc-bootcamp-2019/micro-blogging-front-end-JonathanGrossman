import React from "react";
import Form from "./Form";
import Posts from "./Posts";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <Form />
        <Posts />
      </div>
    );
  }
}

export default Home;
