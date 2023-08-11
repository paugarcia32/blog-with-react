import React from "react";
import Post from "./PostCard";

export default function DisplayPosts({ posts }) {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            summary={post.summary}
            cover={post.cover}
            content={post.content}
            createdAt={post.createdAt}
            author={post.author}
            tag={post.tag}
          />
        ))
      ) : (
        <p>No hay publicaciones disponibles con los tags seleccionados.</p>
      )}
    </div>
  );
}
