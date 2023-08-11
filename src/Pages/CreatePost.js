import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from "react"
import {Navigate} from "react-router-dom";
import Editor from "../editor/QuillEditor/Editor";


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

export default function CreatePost(){
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFile] = useState('')
  const [tag, setTag] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);
  const [redirect, setRedirect] = useState(false)
  const [newTagTitle, setNewTagTitle] = useState("");


  async function createNewTag(ev) {
    ev.preventDefault();

    if (!newTagTitle) {
      return; // Evitar crear el tag si el título está vacío
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTagTitle }), // Enviar el título del nuevo tag al backend
      });

      if (response.ok) {
        const newTag = await response.json();
        setTag([...tag, newTag]); // Agregar el nuevo tag a la lista de tags disponibles
        setNewTagTitle(""); // Limpiar el campo de texto después de crear el tag
      } else {
        console.error("Error creating tag:", response.status);
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  }


  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/tags`, {
          credentials: "include",
        });

        if (response.ok) {
          const tagsData = await response.json();
          setTag(tagsData);
        } else {
          console.error("Error fetching tags:", response.status);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    fetchTags();
  }, []);




  async function createNewPost(ev) {
    console.log("Selected Tags IDs:", selectedTags);

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);

    // Solo envía los IDs de los tags seleccionados, si hay alguno seleccionado
    if (selectedTags.length > 0) {
      selectedTags.forEach((tagId) => data.append('tag', tagId));
    }

    data.set('file', files[0]);

    ev.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_URL}/post`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <div>
      <form onSubmit={createNewPost}>
        <input type="title" placeholder={'Title'}
        value={title}
        onChange={
          ev => setTitle(ev.target.value)
        }/>
        <input type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={
          ev => setSummary(ev.target.value)
        }
        />

        <input
          type="text"
          placeholder="New tag title"
          value={newTagTitle}
          onChange={(ev) => setNewTagTitle(ev.target.value)}
        />
        <button onClick={createNewTag}>Create new tag</button>

        <select
          multiple
          value={selectedTags}
          onChange={(ev) => {
            const selectedOptions = Array.from(ev.target.options)
              .filter((option) => option.selected)
              .map((option) => option.value);
            setSelectedTags(selectedOptions);
          }}
        >
          <option value="">Seleccione uno o más tags...</option>
          {tag.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {tag.title}
            </option>
          ))}
        </select>
        <input type="file"

        onChange={ev => setFile(ev.target.files)}
        />
        <Editor onChange={setContent} value={content} />
        {/* <MdEditor
        value={content}
        onChange={newValue => setContent(newValue)}
        /> */}
        <button style={{marginTop: '5px'}}>Create post</button>
      </form>
    </div>
  )
}