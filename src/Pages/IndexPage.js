import { useEffect, useState } from "react";
import Post from "../Post";
import FilteredPosts from "../components/FilteredPosts";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      <div className="layout">
        <FilteredPosts />
      </div>
    </>
  );
}
