import React from "react";

const MyAppContext = React.createContext({
  signedInUser: "",
  userId: "",
  setUserId: "",
  userName: "",
  setUserName: "",
  userEmail: "",
  setUserEmail: "",
  isInputValid: "",
  setInputValidity: "",
  isSpinning: "",
  setIsSpinning: "",
  isError: "",
  setIsError: "",
  errorMessage: "",
  setErrorMessage: "",
  successMessage: "",
  messagesArray: "",
  setMessagesArray: "",
  content: "",
  setContent: "",
  date: "",
  setDate: "",
  submitMessage: "",
  isUpdatingName: "",
  setIsUpdatingName: "",
  showAlert: "",
  setShowAlert: "",
  buttonClass: "",
  setButtonClass: "",
  applyThisClass: "",
  setApplyThisClass: "",
  profileImage: "",
  setProfileImage: "",
  urlProfileImage: "",
  setUrlProfileImage: "",
  reauthRequired: "",
  setReauthRequired: "",
  verifyOldEmail: "",
  setVerifyOldEmail: ""
});

export default MyAppContext;
