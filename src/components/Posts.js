import React from "react";

const Posts = props => {
  const { messagesArray } = props;
  const sortedMessagesArray = array => {
    return array.sort((a, b) => b.date - a.date);
  };

  return (
    <div className="posts">
      {messagesArray !== null &&
        sortedMessagesArray(messagesArray).map(message => {
          return (
            <div key={message.date} className="posted-message">
              <div className="message-credentials">
                <div>{message.userName}</div>
                <div>{new Date(message.date).toISOString()}</div>
              </div>
              {message.content}
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
