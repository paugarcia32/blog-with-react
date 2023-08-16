// useFetchTags.js
import { useState, useEffect } from "react";

function useFetchTags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
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

    fetchTags();
  }, []);

  return tags;
}

export default useFetchTags;
