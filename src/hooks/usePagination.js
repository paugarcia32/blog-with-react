import { useState } from "react";

function usePagination(postsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const getVisiblePosts = (filteredPosts) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  };

  return {
    currentPage,
    handleNextPage,
    handlePrevPage,
    getVisiblePosts,
  };
}

export default usePagination;
