import { useState, useEffect } from "react";

function useFilterPosts(selectedTags, postsData, search) {
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const filterPosts = () => {
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

        return hasSelectedTags && hasSearchText;
      });

      setFilteredPosts(filteredPosts);
    };

    filterPosts();
  }, [selectedTags, postsData, search]);

  return filteredPosts;
}

export default useFilterPosts;
