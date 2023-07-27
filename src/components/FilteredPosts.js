import React, { useEffect, useState } from "react";
import Post from "../Post";


export default function FilteredPosts() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/post`);
        if (!response.ok) {
          throw new Error("Error al obtener las publicaciones.");
        }
        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/tags`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error al obtener los tags.");
        }
        const tagsData = await response.json();
        setTags(tagsData);
      } catch (error) {
        console.error("Error al obtener los tags:", error);
      }
    };

    fetchPosts();
    fetchTags();
  }, []);

  useEffect(() => {
    // Filtrar los posts según los tags seleccionados
    const filteredPosts = posts.filter((post) => {
      return selectedTags.every((selectedTag) =>
        post.tag.some((postTag) => postTag._id === selectedTag)
      );
    });
    setFilteredPosts(filteredPosts);
  }, [selectedTags, posts]);
const handleClearFilter = () => {
    setSelectedTags([]); // Limpia el array de tags seleccionados
  };

  return (
    <div className="layout">
      <div>


      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
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

      <div>
        <select
          id="tags"
          multiple
          value={selectedTags}
          onChange={(ev) => {
            const selectedOptions = Array.from(ev.target.options)
              .filter((option) => option.selected)
              .map((option) => option.value);
            setSelectedTags(selectedOptions);
          }}
        >
          {tags.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {tag.title}
            </option>
          ))}
        </select>
        {/* Agregar botón para limpiar el filtro */}
      <button className='filter' onClick={handleClearFilter}>Limpiar filtro</button>
      </div>



    </div>
  );
}