import React from "react";
import Button from "../components/Button";

const Profile = props => {
  const { userName } = props;
  return (
    <div className="profile">
      <div className="profile-title">Profile</div>
      <div className="username-title">User Name</div>
      <div className="profile-input-wrapper">
        <input type="text" value={userName} className="username-input" />
        <Button type="Save" />
      </div>
    </div>
  );
};

export default Profile;
