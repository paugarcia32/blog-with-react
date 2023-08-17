import { useState, useEffect } from "react";

function useFetchPostCount() {
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_URL}/post/count`)
      .then((response) => response.json())
      .then((data) => {
        setPostCount(data.totalPosts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { postCount, loading, error };
}

export default useFetchPostCount;
