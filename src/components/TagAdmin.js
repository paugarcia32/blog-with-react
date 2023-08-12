import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

const Tags = () => {
  const [tagCount, setTagCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTagTitle, setNewTagTitle] = useState("");
  const { setUserInfo, userInfo } = useContext(UserContext);

  const token = localStorage.getItem("token");
  useEffect(() => {
    // Fetch tag count and list of tags from the server
    fetchTagCount();
    fetchTags();
  }, []);

  const fetchTagCount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/tags/count`);
      const data = await response.json();
      setTagCount(data.tagCount);
    } catch (error) {
      console.error("Error fetching tag count:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/tags`);
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const handleTagUpdate = async (newTitle) => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/tags/${selectedTag._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });
      fetchTags();
      setSelectedTag(null);
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  const handleTagDelete = async () => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/tags/${selectedTag._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTagCount();
      fetchTags();
      setSelectedTag(null);
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleDeselect = () => {
    setSelectedTag(null);
  };

  const handleNewTagSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/tags`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTagTitle }),
      });

      if (response.ok) {
        setNewTagTitle("");
        fetchTags();
        fetchTagCount();
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  return (
    <div>
      <h1>Tags</h1>
      <p>Total tags: {tagCount}</p>
      <ul>
        {tags.map((tag) => (
          <li
            key={tag._id}
            onClick={() => handleTagSelect(tag)}
            style={{
              cursor: "pointer",
              fontWeight: selectedTag?._id === tag._id ? "bold" : "normal",
            }}
          >
            {tag.title}
          </li>
        ))}
      </ul>
      {selectedTag && (
        <div>
          <h2>Edit Tag</h2>
          <input
            type="text"
            value={selectedTag.title}
            onChange={(e) =>
              setSelectedTag({ ...selectedTag, title: e.target.value })
            }
          />
          <button onClick={() => handleTagUpdate(selectedTag.title)}>
            Update
          </button>
          <button onClick={handleTagDelete}>Delete</button>
          <button onClick={handleDeselect}>Deselect</button>
        </div>
      )}
      <div>
        <h2>Create New Tag</h2>
        <form onSubmit={handleNewTagSubmit}>
          <input
            type="text"
            placeholder="New Tag Title"
            value={newTagTitle}
            onChange={(e) => setNewTagTitle(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Tags;
