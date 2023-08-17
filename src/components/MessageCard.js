import React from "react";
import "../styles/MessageCard.css";

const MessageCard = ({ message, onDelete }) => {
  const handleDelete = () => {
    onDelete(message._id);
  };

  return (
    <div className="card">
      <h3>{message.author}</h3>
      <div className="card-content">
        <p className="card-text">{message.email}</p>
        <p className="card-text">
          {new Date(message.date).toLocaleDateString()}
        </p>
      </div>

      <p>{message.message}</p>

      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
