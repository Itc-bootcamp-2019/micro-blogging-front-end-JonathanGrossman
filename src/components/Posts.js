import React, { useContext } from "react";
import AppContext from "../context/AppContext.js";

const Posts = () => {
  const appContext = useContext(AppContext);

  const sortedMessagesArray = array => {
    return array.sort((a, b) => b.date - a.date);
  };

  return (
    <div className="posts">
      {appContext.messagesArray !== null &&
        sortedMessagesArray(appContext.messagesArray).map(message => {
          const displayDate = new Date(message.date).toISOString();
          return (
            <div key={message.date} className="posted-message">
              {console.log(message)}
              <div className="message-credentials">
                <img src={message.urlProfileImage} alt="user" className="message-photo" />
                <div>{message.userName}</div>
                <div>{displayDate}</div>
              </div>
              {message.content}
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
