import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
// import "./CommentList.css";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from the API and set them in state
    fetch(`${process.env.REACT_APP_URL}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      // Make a DELETE request to your backend API to delete the comment with the given commentId
      const response = await fetch(
        `${process.env.REACT_APP_URL}/comment/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the comment was successfully deleted, update the state to remove the deleted comment
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
