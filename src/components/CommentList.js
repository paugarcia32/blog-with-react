import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/comment/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment-list">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          onDelete={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
