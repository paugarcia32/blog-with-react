import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import TableOfContents from "../components/TOC.js";

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
    // Obtener los detalles del post y los tags asociados al post
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
        setPostContent(postInfo.content); // Guardar el contenido del post
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
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by {postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        /*For editing the post*/
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {/* SVG paths */}
            </svg>
            Edit this post
          </Link>
          <Link className="delete-btn" to={`/index`}>
            <button className="delete-btn" onClick={deletePost}>
              Eliminar este post
            </button>
          </Link>
        </div>
      )}
      <h1>{postInfo.title}</h1>
      {/* Mostrar los tags asociados al post */}
      <div className="tags">
        <strong>Tags: </strong>
        {postInfo.tag.map((associatedTag, index) => (
          <span key={associatedTag._id} className="tag">
            {associatedTag.title}
            {index !== postInfo.tag.length - 1 && ", "}
          </span>
        ))}
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />

      {/* Renderizar la tabla de contenidos solo si el contenido del post es válido */}
      {postContent && <TableOfContents content={postContent} />}
    </div>
  );
}
