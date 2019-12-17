import React from "react";

const Alert = props => {
  const { errorMessage } = props;
  return (
    <div>
      <div className="alert">{errorMessage}</div>
    </div>
  );
};

export default Alert;
