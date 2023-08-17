import React from "react";
import "../styles/CommentCard.css";

const CommentCard = ({ comment, onDelete }) => {
  const handleDelete = () => {
    onDelete(comment._id);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="comment-author">{comment.autor}</h3>
        <h3>{comment.postId.title}</h3>
      </div>
      <div className="comment-likes">Likes: {comment.likes}</div>
      <div className="comment-content">{comment.contenido}</div>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default CommentCard;
