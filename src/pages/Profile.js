import React, { useContext } from "react";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import AppContext from "../context/AppContext";
import firebase from "../lib/firebase";

const Profile = () => {
  const appContext = useContext(AppContext);
  const handleChange = e => {
    appContext.setUserName(e.target.value);
  };
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <div className="profile">
      <div className="page-title">Profile</div>
      <div className="page-subtitle">User Name</div>

      {appContext.showAlert && (
        <div className="alert-profile-updated">
          <Alert type="Success" />
        </div>
      )}
      {appContext.isError && (
        <div className="alert-profile-updated">
          <Alert type="Profile Error" />
        </div>
      )}
      <div className="profile-input-wrapper">
        <input
          type="text"
          value={appContext.userName}
          onChange={e => handleChange(e)}
          className="username-input"
        />
        {appContext.isUpdatingName && (
          <div className="profile-spinner">
            <Spinner />
          </div>
        )}
        {!appContext.isUpdatingName && <Button type="Save" />}
      </div>
      <button className="button logout-button-profile" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
