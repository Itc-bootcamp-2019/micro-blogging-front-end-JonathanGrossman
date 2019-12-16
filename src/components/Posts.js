import React from "react";

const Posts = props => {
  const { messagesArray } = props;
  return (
    <div className="posts">
      {console.log(messagesArray)}
      {messagesArray.map(message => {
        return <div>{message.message}</div>;
      })}
    </div>
  );
};

export default Posts;
