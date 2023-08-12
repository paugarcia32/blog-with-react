import React from "react";
import "../styles/MessageCard.css";

const MessageCard = ({ message }) => {
  return (
    <div className="card">
      <h3>{message.author}</h3>
      <div className="card-content">
        <p className="card-text">{message.email}</p>
        <p className="card-text">
          {new Date(message.date).toLocaleDateString()}
        </p>
      </div>

      <p>
        Message:
        <br />
        {message.message}
      </p>
    </div>
  );
};

export default MessageCard;
