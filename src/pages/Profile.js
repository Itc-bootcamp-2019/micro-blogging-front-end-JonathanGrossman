import React, { useState } from "react";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

const Profile = props => {
  const { userName, setUserName } = props;
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const updateLocalStorage = () => {
    setIsUpdatingName(true);
    setTimeout(function() {
      setIsUpdatingName(false);
    }, 2000);
    localStorage.setItem("microBlogUserName", userName);
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
  // const toggleButtonAppearance = () => {
  //   if (isUpdatingName) {
  //     return (
  //       <div className="profile-spinner">
  //         <Spinner />
  //       </div>
  //     );
  //   } else if (!isUpdatingName) {
  //     return <Button type="Save" submitInput={updateLocalStorage} />;
  //   }
  // };

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
        {toggleButtonAppearance()}
        {/* {isUpdatingName && (
          <div className="profile-spinner">
            <Spinner />
          </div>
        )}
        {!isUpdatingName && (
          <Button type="Save" submitInput={updateLocalStorage} />
        )} */}
      </div>
    </div>
  );
};

export default Profile;
