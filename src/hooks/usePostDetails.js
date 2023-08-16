import { useState, useEffect } from "react";

export function usePostDetails(id) {
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/post/${id}`);
        if (response.ok) {
          const postInfo = await response.json();
          setPostDetails(postInfo);
        } else {
          console.error("Error fetching post details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }

    fetchPostDetails();
  }, [id]);

  return postDetails;
}
