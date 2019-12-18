import React, { useContext } from "react";
import AppContext from "../context/AppContext";

const Alert = props => {
  const { type } = props;
  const appContext = useContext(AppContext);

  return (
    <div>
      {type === "Error" && (
        <div className="alert alert-error">{appContext.errorMessage}</div>
      )}
      {type === "Success" && (
        <div className="alert alert-success">{appContext.successMessage}</div>
      )}
    </div>
  );
};

export default Alert;
