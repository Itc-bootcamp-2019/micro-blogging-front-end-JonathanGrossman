import React from "react";

const Profile = props => {
  const { userName } = props;
  return (
    <div className="profile">
      <div className="profile-title">Profile</div>
      <div className="username-title">User Name</div>
      <input type="text" value={userName} className="username-input" />
    </div>
  );
};

export default Profile;
