import React from "react";

const MessageCard = ({ message }) => {
  return (
    <div className="card">
      <h3>Author: {message.author}</h3>
      <p>Email: {message.email}</p>
      <p>Message: {message.message}</p>
      <p>Date: {new Date(message.date).toLocaleDateString()}</p>
    </div>
  );
};

export default MessageCard;
