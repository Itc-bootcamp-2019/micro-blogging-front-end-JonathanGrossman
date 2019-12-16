import React from "react";

const Button = props => {
  const { type } = props;
  return (
    <div className="button">
      <div className="button">{type}</div>
    </div>
  );
};

export default Button;
