import React from "react";

const Posts = props => {
  const { messagesArray } = props;
  return (
    <div className="posts">
      {messagesArray !== null &&
        messagesArray.map(message => {
          return <div key={message.id}>{message.message}</div>;
        })}
    </div>
  );
};

export default Posts;
