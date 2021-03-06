import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import AppContext from "../context/AppContext";
import firebase from "../lib/firebase";
import { storage } from "../lib/firebase";

const Profile = () => {
  const appContext = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);
  const [password, setPassword] = useState(false);

  const handleChangeImage = e => {
    if (e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      const imageForSetting = e.target.files[0];
      appContext.setProfileImage(imageForSetting);
      setIsPhotoSelected(true);
    }
  };

  const handleUpload = () => {
    setIsLoading(true);
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
                  if (appContext.userEmail === doc.data().email) {
                    db.collection("users")
                      .doc(doc.data().id)
                      .update({ image: urlForSetting });
                    setIsLoading(false);
                    setIsPhotoSelected(false);
                    appContext.setProfileImage("");
                  }
                });
              });
          });
      }
    );
  };
  const handleChange = e => {
    appContext.setUserName(e.target.value);
  };
  const handleChangeEmail = e => {
    appContext.setUserEmail(e.target.value);
  };
  const handleVerifyEmail = e => {
    appContext.setVerifyOldEmail(e.target.value);
  };
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleReauth = history => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      appContext.verifyOldEmail,
      password
    );
    user
      .reauthenticateWithCredential(credential)
      .then(function() {
        // UPDATE USER AUTH
        user
          .updateEmail(appContext.userEmail)
          .then(function() {
            appContext.setUserEmail(appContext.userEmail);
            appContext.setReauthRequired(false);
          })
          .catch(function(error) {
            // An error happened.
          });
        // UPDATE USER COLLECTION
        const db = firebase.firestore();
        db.collection("users")
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              if (user.email === doc.data().email)
                db.collection("users")
                  .doc(doc.data().id)
                  .update({ email: appContext.userEmail });
            });
          });
        history.push("/profile");
      })
      .catch(function(error) {
        // An error happened.
      });
  };
  const logout = () => {
    appContext.setSignedInUser(null);
    firebase.auth().signOut();
  };
  return (
    <div className="profile">
      <div className="page-title">Profile</div>
      {!isLoading && (
        <img
          src={file || appContext.urlProfileImage}
          alt="user"
          className="user-photo"
        />
      )}
      {isLoading && (
        <div className="user-photo">
          <div className="user-photo-spinner">
            <Spinner />
          </div>
        </div>
      )}
      <div className="user-photo-name">{appContext.profileImage.name}</div>
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
          className={
            isPhotoSelected
              ? "button user-photo-save-button"
              : "button user-photo-save-button-inactive"
          }
        >
          Save
        </button>
      </div>
      {!appContext.reauthRequired && (
        <div className="profile-username-subtitle">User Name</div>
      )}
      {!appContext.reauthRequired && appContext.showAlert && (
        <div className="alert-profile-updated">
          <Alert type="Success" />
        </div>
      )}
      {appContext.isError && (
        <div className="alert-profile-updated">
          <Alert type="Profile Error" />
        </div>
      )}
      {!appContext.reauthRequired && (
        <div className="profile-input-wrapper">
          <input
            type="text"
            value={appContext.userName}
            onChange={e => handleChange(e)}
            className="username-input"
          />
          <input
            type="text"
            value={appContext.userEmail}
            onChange={e => handleChangeEmail(e)}
            className="useremail-input"
          />
          {appContext.isUpdatingName && (
            <div className="profile-spinner">
              <Spinner />
            </div>
          )}
          {!appContext.isUpdatingName && <Button type="Save" />}
          <Link to="/reset-password" className="reset-password-profile">
            Reset password
          </Link>
        </div>
      )}

      {!appContext.reauthRequired && (
        <button className="button logout-button-profile" onClick={logout}>
          Logout
        </button>
      )}
      {appContext.reauthRequired && <div className="reauth-required"></div>}
      {appContext.reauthRequired && (
        <input
          type="text"
          onChange={e => handleVerifyEmail(e)}
          className="username-input"
          placeholder="Confirm old email"
        />
      )}
      {appContext.reauthRequired && (
        <input
          type="password"
          onChange={e => handleChangePassword(e)}
          className="useremail-input"
          placeholder="Confirm password"
        />
      )}
      {appContext.reauthRequired && (
        <button className="button input-button-profile" onClick={handleReauth}>
          Verify
        </button>
      )}
    </div>
  );
};

export default Profile;
