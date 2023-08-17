import { useState, useEffect } from "react";

function useFetchPostNames() {
  const [postNames, setPostNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/post/names`)
      .then((response) => response.json())
      .then((data) => {
        setPostNames(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return { postNames, error };
}

export default useFetchPostNames;
