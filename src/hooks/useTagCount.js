import { useState, useEffect } from "react";

function useFetchTagCount() {
  const [tagCount, setTagCount] = useState(0);

  useEffect(() => {
    const fetchTagCount = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/tags/count`);
        const data = await response.json();
        setTagCount(data.tagCount);
      } catch (error) {
        console.error("Error fetching tag count:", error);
      }
    };

    fetchTagCount();
  }, []);

  return tagCount;
}

export default useFetchTagCount;
