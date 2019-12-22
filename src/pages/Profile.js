import React, { useContext } from "react";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import AppContext from "../context/AppContext";
import firebase from "../lib/firebase";
import { storage } from "../lib/firebase";

const Profile = () => {
  const appContext = useContext(AppContext);

  const handleChangeImage = e => {
    if (e.target.files[0]) {
      const imageForSetting = e.target.files[0];
      appContext.setProfileImage(imageForSetting);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage
      .ref(`images/${appContext.profileImage.name}`)
      .put(appContext.profileImage);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // placeholder to show message while uploading
      },
      error => {
        // placeholder for alerting errors
      },
      () => {
        storage
          .ref("images")
          .child(appContext.profileImage.name)
          .getDownloadURL()
          .then(urlForSetting => {
            appContext.setUrlProfileImage(urlForSetting);
            const db = firebase.firestore();
            db.collection("users")
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  if (appContext.userEmail === doc.data().email)
                    db.collection("users")
                      .doc(doc.data().id)
                      .update({ image: urlForSetting });
                });
              });
          });
      }
    );
  };
  const handleChange = e => {
    appContext.setUserName(e.target.value);
  };
  const logout = () => {
    appContext.setSignedInUser(null);
    firebase.auth().signOut();
  };
  return (
    <div className="profile">
      <div className="page-title">Profile</div>
      <img
        src={appContext.urlProfileImage || "http://via.placeholder.com/400x300"}
        alt="user"
        className="user-photo"
      />
      <div className="photo-button-wrapper">
        <label
          htmlFor="upload-photo"
          className="button user-photo-choose-label"
        >
          Select
        </label>
        <input
          type="file"
          id="upload-photo"
          onChange={handleChangeImage}
          className="user-photo-choose-button"
        />
        <button
          onClick={handleUpload}
          className="button user-photo-save-button"
        >
          Save
        </button>
      </div>
      <div className="profile-username-subtitle">User Name</div>

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
