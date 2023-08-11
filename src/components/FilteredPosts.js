import React, { useEffect, useState } from "react";
import Post from "../Post";
import Form from "react-bootstrap/Form";

export default function FilteredPosts() {
  const [postsData, setPostsData] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2); // Número de publicaciones por página

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/post/all`);
        if (!response.ok) {
          throw new Error("Error al obtener las publicaciones.");
        }
        const postsData = await response.json();
        setPostsData(postsData);
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
    // Filtrar los posts según los tags seleccionados y la búsqueda
    const filteredPosts = postsData.filter((post) => {
      // Filtrar por tags seleccionados
      const hasSelectedTags =
        selectedTags.length === 0 ||
        selectedTags.every((selectedTag) =>
          post.tag.some((postTag) => postTag._id === selectedTag)
        );

      // Filtrar por búsqueda
      const hasSearchText =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.summary.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());

      return hasSelectedTags && hasSearchText;
    });

    setFilteredPosts(filteredPosts);
  }, [selectedTags, postsData, search]);

  const handleClearFilter = () => {
    setSelectedTags([]);
    setSearch("");
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calcular el índice de la última publicación en la página actual
  const indexOfLastPost = currentPage * postsPerPage;
  // Calcular el índice de la primera publicación en la página actual
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Obtener las publicaciones de la página actual
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <div className="searchBar">
        <Form>
          <Form.Control
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts"
          />
        </Form>
      </div>

      <div className="layout">
        <div>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
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

        <div className="tagFilter">
          <h3>Tags</h3>
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
          <button className="filter" onClick={handleClearFilter}>
            Limpiar filtro
          </button>
        </div>

        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={handlePrevPage} className="paginationButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="paginationIcon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 15l-6-6 6-6"
                />
              </svg>
            </button>
          )}
          {currentPage < Math.ceil(filteredPosts.length / postsPerPage) && (
            <button onClick={handleNextPage} className="paginationButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="paginationIcon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9l6 6-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
