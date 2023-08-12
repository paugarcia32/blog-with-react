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

  return (
    <div className="comment-list">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
