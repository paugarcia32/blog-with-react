import React from "react";
// import "./CommentCard.css";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <div className="comment-author">Author: {comment.autor}</div>
      <div className="comment-post">Post: {comment.postId.title}</div>
      <div className="comment-content">Content: {comment.contenido}</div>
      <div className="comment-likes">Likes: {comment.likes}</div>
    </div>
  );
};

export default CommentCard;
