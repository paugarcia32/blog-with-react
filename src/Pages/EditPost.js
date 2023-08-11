import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../editor/QuillEditor/Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Obtener los detalles del post al cargar la página de edición
    fetch(`${process.env.REACT_APP_URL}/post/${id}`)
      .then((response) => {
        response.json().then((postInfo) => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);

          // Obtener los tags asociados al post y almacenar sus IDs en selectedTags
          setSelectedTags(postInfo.tag.map((tag) => tag._id));
        });
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });

    // Obtener los tags disponibles para que el usuario pueda elegir
    fetch(`${process.env.REACT_APP_URL}/tags`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching tags.");
        }
      })
      .then((tagsData) => {
        setTags(tagsData);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);

    // Agregar los IDs de los tags seleccionados al cuerpo de la solicitud PUT
    selectedTags.forEach((tagId) => data.append("tag", tagId));

    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch(`${process.env.REACT_APP_URL}/post/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      console.error("Error updating post:", response.status);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
        />
        <Editor onChange={setContent} value={content} />
        <div>
          <label htmlFor="tags">Selecciona uno o más tags:</label>
          <select
            id="tags"
            multiple
            value={selectedTags}
            onChange={(ev) => {
              const selectedOptions = Array.from(ev.target.options)
                .filter((option) => option.selected)
                .map((option) => option.value);
              setSelectedTags(selectedOptions);
            }}
          >
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.title}
              </option>
            ))}
          </select>
        </div>
        <button style={{ marginTop: "5px" }}>Update post</button>
      </form>
    </div>
  );
}
