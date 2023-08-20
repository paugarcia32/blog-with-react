import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import TableOfContents from "../components/TOC.js";

import "../styles/PostPage.css";
import { FaTags } from "react-icons/fa";
export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [tags, setTags] = useState([]);
  const [postContent, setPostContent] = useState("");
  const token = localStorage.getItem("token");

  const deletePost = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/post/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("Post deleted successfully");
    } else {
      console.error("Error deleting post:", response.status);
    }
  };

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_URL}/post/${id}`).then((response) =>
        response.json()
      ),
      fetch(`${process.env.REACT_APP_URL}/tags`, {
        credentials: "include",
      }).then((response) => response.json()),
    ])
      .then(([postInfo, tagsData]) => {
        setPostInfo(postInfo);
        setTags(tagsData);
        setPostContent(postInfo.content);
      })
      .catch((error) => {
        console.error("Error fetching post and tags:", error);
      });
  }, [id]);

  if (!postInfo) return null;

  return (
    <div className="post-page">
      <div className="image">
        <img src={`${process.env.REACT_APP_URL}/${postInfo.cover}`} alt="" />
      </div>
      <div className="headers">
        <h1>{postInfo.title}</h1>
        <div className="h-text">
          <time>{formatISO9075(new Date(Date.parse(postInfo.createdAt)))}</time>

          <div className="author">
            by&nbsp;
            {postInfo.author.username}
          </div>
        </div>
      </div>

      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <button className="edit-btn">Edit this post</button>
          </Link>
          <Link className="delete-btn" to={`/index`}>
            <button className="delete-btn" onClick={deletePost}>
              Eliminar este post
            </button>
          </Link>
        </div>
      )}

      <div className="toc-content">
        <div className="scrollable-content">
          <div className="toc-tags">
            <div className="tags">
              <strong className="related-tags">
                <FaTags className="tags-icon" /> Tags:
              </strong>

              <br />
              {postInfo.tag.map((associatedTag, index) => (
                <span key={associatedTag._id} className="tag">
                  <Link
                    className="linkedTags"
                    to={`/tags/${associatedTag._id}`}
                  >
                    {associatedTag.title}
                  </Link>
                  {index !== postInfo.tag.length - 1 && ", "}
                </span>
              ))}
            </div>
            {postInfo.content && <TableOfContents content={postInfo.content} />}
          </div>
        </div>

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </div>
  );
}
