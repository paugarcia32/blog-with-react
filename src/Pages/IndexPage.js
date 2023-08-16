import React, { useState } from "react";
import "../styles/PostCard.css";
import "../styles/IndexPage.css";
import useFetchPosts from "../hooks/useFetchPosts";
import useFetchTags from "../hooks/useFetchTags";
import useFilterPosts from "../hooks/useFilterPosts";
import usePagination from "../hooks/usePagination";
import SearchBar from "../components/SearchBar.js";
import Pagination from "../components/Pagination.js";
import TagFilter from "../components/TagFilter.js";
import DisplayPosts from "../components/DisplayPosts.js";
import TagAdmin from "../components/TagAdmin";
import PostAdmin from "../components/PostAdmin";
import MessagesList from "../components/MessageList";
import CommentList from "../components/CommentList";

export default function IndexPage() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState("");
  const postsData = useFetchPosts();
  const tags = useFetchTags();
  const filteredPosts = useFilterPosts(selectedTags, postsData, search);
  const { currentPage, handleNextPage, handlePrevPage, getVisiblePosts } =
    usePagination(3);

  const totalPages = Math.ceil(filteredPosts.length / 3);

  const handleChange = (selectedList) => {
    const selectedOptions = selectedList.map((item) => item.value);
    setSelectedTags(selectedOptions);
  };

  const visiblePosts = getVisiblePosts(filteredPosts);

  return (
    <div className="index-page">
      <div className="admin-layout">
        <div className="admin-section">
          <TagAdmin />
          <CommentList />
        </div>
        <div className="admin-section">
          <PostAdmin />
          <MessagesList />
        </div>
      </div>
      <div className="layout">
        <div className="sidebar">
          <SearchBar search={search} setSearch={setSearch} />
          <TagFilter
            tags={tags}
            selectedTags={selectedTags}
            handleClearFilter={() => setSelectedTags([])}
            handleChange={handleChange}
          />
        </div>
        {/* Columna izquierda */}
        <div className="main-content">
          <DisplayPosts posts={visiblePosts} className="display" />
        </div>
        {/* Columna derecha */}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}
