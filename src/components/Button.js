import React from "react";

const Button = props => {
  const { type } = props;
  return <div className="button">{type}</div>;
};

export default Button;
