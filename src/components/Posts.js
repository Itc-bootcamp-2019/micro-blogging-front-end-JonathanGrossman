import React from "react";

const Posts = props => {
  const { messagesArray } = props;

  // NOTE: THIS IS FOR LOCAL STORAGE
  // const sortedMessagesArray = array => {
  //   return array.sort((a, b) => b.date - a.date);
  // };

  const sortedMessagesArray = array => {
    return array.sort((a, b) => b.date - a.date);
  };

  return (
    <div className="posts">
      {console.log(sortedMessagesArray(messagesArray))}
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
      {/* // NOTE: THIS IS FOR LOCAL STORAGE */}
      {/* {messagesArray !== null &&
        sortedMessagesArray(messagesArray).map(message => {
          return (
            <div key={message.id} className="posted-message">
              <div className="message-credentials">
                <div>{message.userName}</div>
                <div>{new Date(message.date).toISOString()}</div>
              </div>
              {message.content}
            </div>
          );
        })} */}
    </div>
  );
};

export default Posts;
