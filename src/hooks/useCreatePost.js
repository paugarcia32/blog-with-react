import { useState } from "react";

function useCreatePost() {
  const [success, setSuccess] = useState(false);

  async function createPost(title, summary, content, selectedTags, files) {
    const postData = {
      title,
      summary,
      content,
      tag: selectedTags,
    };

    const formData = new FormData();
    formData.append("postData", JSON.stringify(postData));
    formData.append("file", files[0]);

    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/post`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        return true;
      } else {
        console.error("Error creating post:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    }
  }

  return createPost;
}

export default useCreatePost;
