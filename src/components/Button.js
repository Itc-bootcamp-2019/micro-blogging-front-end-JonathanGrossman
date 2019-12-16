import React from "react";

const Button = props => {
  const { type, submitMessage } = props;
  return (
    <div className="button" onClick={submitMessage}>
      {type}
    </div>
  );
};

export default Button;
