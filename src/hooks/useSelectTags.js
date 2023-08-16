import { useEffect, useState } from "react";

function useSelectTags() {
  const [tags, setTags] = useState([]);

  async function fetchTags() {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/tags`, {
        credentials: "include",
      });

      if (response.ok) {
        const tagsData = await response.json();
        setTags(tagsData);
      } else {
        console.error("Error fetching tags:", response.status);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }

  return { tags, fetchTags };
}

export default useSelectTags;
