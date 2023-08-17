import React from "react";
import { Link } from "react-router-dom";
import "../styles/PostAdmin.css";
import useFetchPostCount from "../hooks/useFetchPostCount";
import useFetchPostNames from "../hooks/useFetchPostNames";

const PostAdmin = () => {
  const {
    postCount,
    loading: loadingCount,
    error: errorCount,
  } = useFetchPostCount();
  const { postNames, error: errorNames } = useFetchPostNames();

  if (loadingCount) {
    return <div>Loading...</div>;
  }

  if (errorCount) {
    return <div>Error: {errorCount.message}</div>;
  }

  if (errorNames) {
    return <div>Error: Unable to fetch post names</div>;
  }

  return (
    <div className="PostAdmin">
      <h1>Posts</h1>
      <p>Number of Posts: {postCount}</p>
      <ul>
        {postNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <Link to="/create">Create new post</Link>
    </div>
  );
};

export default PostAdmin;
