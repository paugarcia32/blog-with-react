// import { useEffect, useState } from "react";
// import Post from "../Post";
// import FilteredPosts from "../components/FilteredPosts";

// export default function IndexPage() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_URL}/post`).then((response) => {
//       response.json().then((posts) => {
//         setPosts(posts);
//       });
//     });
//   }, []);
//   return (
//     <>
//       <div className="layout">
//         <FilteredPosts />
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import "../styles/PostCard.css";
import "../styles/IndexPage.css";
import SearchBar from "../components/SearchBar.js";
import Pagination from "../components/Pagination.js";
import TagFilter from "../components/TagFilter.js";
import DisplayPosts from "../components/DisplayPosts.js";
import TagAdmin from "../components/TagAdmin";
import PostAdmin from "../components/PostAdmin";

export default function IndexPage() {
  const [postsData, setPostsData] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3); // Número de publicaciones por página

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
        post.summary.toLowerCase().includes(search.toLowerCase());
      // post.content.toLowerCase().includes(search.toLowerCase());

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

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleChange = (selectedList) => {
    const selectedOptions = selectedList.map((item) => item.value);
    setSelectedTags(selectedOptions);
  };

  return (
    <div className="index-page">
      <div className="layout">
        <div className="sidebar">
          <SearchBar search={search} setSearch={setSearch} />
          <TagFilter
            tags={tags}
            selectedTags={selectedTags}
            handleClearFilter={handleClearFilter}
            handleChange={handleChange}
          />
        </div>
        {/* Columna izquierda */}
        <div className="main-content">
          <DisplayPosts posts={currentPosts} className="display" />
        </div>
        {/* Columna derecha */}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      <TagAdmin />
      <PostAdmin />
    </div>
  );
}
