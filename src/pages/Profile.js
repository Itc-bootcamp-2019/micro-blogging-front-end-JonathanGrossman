import React, { useState, useContext } from "react";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import AppContext from "../context/AppContext";

const Profile = props => {
  const appContext = useContext(AppContext);
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const updateLocalStorage = () => {
    setIsUpdatingName(true);
    setTimeout(function() {
      setIsUpdatingName(false);
      setShowAlert(true);
      toggleAlert();
    }, 3000);
    localStorage.setItem("microBlogUserName", appContext.userName);
  };
  const toggleButtonAppearance = () => {
    if (isUpdatingName) {
      return (
        <div className="profile-spinner">
          <Spinner />
        </div>
      );
    } else {
      return <Button type="Save" submitInput={updateLocalStorage} />;
    }
  };

  const toggleAlert = () => {
    setTimeout(function() {
      setShowAlert(false);
    }, 3000);
  };

  const handleChange = e => {
    appContext.setUserName(e.target.value);
  };
  return (
    <div className="profile">
      <div className="profile-title">Profile</div>
      <div className="username-title">User Name</div>
      {showAlert && (
        <div className="alert-profile-updated">
          <Alert message={"User Name updated!"} type="Success" />
        </div>
      )}
      <div className="profile-input-wrapper">
        <input
          type="text"
          value={appContext.userName}
          onChange={e => handleChange(e)}
          className="username-input"
        />
        {toggleButtonAppearance()}
      </div>
    </div>
  );
};

export default Profile;
