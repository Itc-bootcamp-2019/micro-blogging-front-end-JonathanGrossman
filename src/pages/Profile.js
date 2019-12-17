import React from "react";
import Button from "../components/Button";

const Profile = props => {
  const { userName, setUserName } = props;
  const handleChange = e => {
    setUserName(e.target.value);
  };
  return (
    <div className="profile">
      <div className="profile-title">Profile</div>
      <div className="username-title">User Name</div>
      <div className="profile-input-wrapper">
        <input
          type="text"
          value={userName}
          onChange={e => handleChange(e)}
          className="username-input"
        />
        <Button type="Save" submitInput={setUserName} />
      </div>
    </div>
  );
};

export default Profile;
