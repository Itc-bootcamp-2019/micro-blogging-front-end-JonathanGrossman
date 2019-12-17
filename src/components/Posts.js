import React from "react";

const Posts = props => {
  const { messagesArray } = props;

  const sortedMessagesArray = array => {
    return array.sort((a, b) => b.dateCreated - a.dateCreated);
  };

  return (
    <div className="posts">
      {messagesArray !== null &&
        sortedMessagesArray(messagesArray).map(message => {
          return (
            <div key={message.id} className="posted-message">
              <div className="message-credentials">
                <div>{message.author}</div>
                <div>{Date(message.dateCreated)}</div>
              </div>
              {message.message}
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
