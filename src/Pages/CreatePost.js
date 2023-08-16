import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../editor/QuillEditor/Editor";
import "../styles/CreatePost.css";
import useSelectTags from "../hooks/useSelectTags";
import useCreatePost from "../hooks/useCreatePost";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFile] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const tags = useSelectTags();
  const createPost = useCreatePost();

  useEffect(() => {
    tags.fetchTags();
  }, [tags]);

  async function handleCreatePost(ev) {
    ev.preventDefault();
    const success = await createPost(
      title,
      summary,
      content,
      selectedTags,
      files
    );

    if (success) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="conatiner">
      <form onSubmit={handleCreatePost}>
        <input
          className="input"
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          className="textarea"
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <select
          className="select"
          multiple
          value={selectedTags}
          onChange={(ev) => {
            const selectedOptions = Array.from(ev.target.options)
              .filter((option) => option.selected)
              .map((option) => option.value);
            setSelectedTags(selectedOptions);
          }}
        >
          {tags.tags.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {tag.title}
            </option>
          ))}
        </select>
        <input
          className="file-input"
          id="file-input"
          type="file"
          onChange={(ev) => setFile(ev.target.files)}
        />
        <Editor onChange={setContent} value={content} />
        <button className="button" style={{ marginTop: "5px" }}>
          Create post
        </button>
      </form>
    </div>
  );
}
