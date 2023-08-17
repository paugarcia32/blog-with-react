import React, { useState, useEffect } from "react";
import MessageCard from "./MessageCard";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/message/${messageId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedMessages = messages.filter(
          (message) => message._id !== messageId
        );
        setMessages(updatedMessages);
      } else {
        console.error("Error deleting message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div>
      <h2>Messages List</h2>
      <div className="cards-container">
        {messages.map((message) => (
          <MessageCard
            key={message._id}
            message={message}
            onDelete={handleDeleteMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
