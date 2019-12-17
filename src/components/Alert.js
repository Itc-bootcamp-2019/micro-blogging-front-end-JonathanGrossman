import React, { useState, useEffect } from "react";

const Alert = props => {
  const { message, type } = props;
  const [applyThisClass, setApplyThisClass] = useState("");
  useEffect(() => {
    applyClass();
  });
  const applyClass = () => {
    if (type === "Error") {
      setApplyThisClass("alert alert-error");
    } else if (type === "Success") {
      setApplyThisClass("alert alert-success");
    }
  };

  return (
    <div>
      <div className={applyThisClass}>{message}</div>
    </div>
  );
};

export default Alert;
