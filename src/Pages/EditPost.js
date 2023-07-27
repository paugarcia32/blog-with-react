
// import { useEffect, useState } from "react"
// import {Navigate, useParams} from "react-router-dom";
// import Editor from "../Editor";

// export default function EditPost() {
//   const {id} = useParams();
//   const [title,setTitle] = useState('');
//   const [summary,setSummary] = useState('');
//   const [content,setContent] = useState('');
//   const [files, setFiles] = useState('');
//   const [redirect,setRedirect] = useState(false);


//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_URL}/post/` + id)
//     .then(response => {
//         response.json().then(postInfo => {
//           setTitle(postInfo.title);
//           setContent(postInfo.content);
//           setSummary(postInfo.summary);
//         });
//       });
//   }, []);

//   async function updatePost(ev){
//     ev.preventDefault()
//     const data = new FormData()
//     data.set('title', title)
//     data.set('summary', summary)
//     data.set('content', content)
//     data.set('id', id)
//     if (files?.[0]){
//       data.set('file', files?.[0])
//     }


//     const response = await fetch(`${process.env.REACT_APP_URL}/post/`, {
//       method: 'PUT',
//       body: data,
//       credentials: 'include',
//     })
//     if (response.ok){
//       setRedirect(true)
//     }

//   }

//   if (redirect) {
//     return <Navigate to={'/post/'+id} />
//   }




//   return (
//     <div>
//       <form onSubmit={updatePost}>
//         <input type="title" placeholder={'Title'}
//         value={title}
//         onChange={
//           ev => setTitle(ev.target.value)
//         }/>
//         <input type="summary"
//         placeholder={'Summary'}
//         value={summary}
//         onChange={
//           ev => setSummary(ev.target.value)
//         }
//         />
//         <input type="file"

//         onChange={ev => setFiles(ev.target.files)}
//         />
//         <Editor onChange={setContent} value={content}/>
//         <button style={{marginTop: '5px'}}>Update post</button>
//       </form>
//     </div>
//   )

// }

// import React, { useEffect, useState } from "react";
// import { useParams, Navigate } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };
// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ];

// export default function EditPost() {
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [content, setContent] = useState("");
//   const [files, setFiles] = useState("");
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_URL}/post/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error fetching post.");
//         }
//         return response.json();
//       })
//       .then((postInfo) => {
//         setTitle(postInfo.title);
//         setSummary(postInfo.summary);
//         setContent(postInfo.content);
//       })
//       .catch((error) => {
//         console.error("Error fetching post:", error);
//       });
//   }, [id]);

//   async function updatePost(ev) {
//     ev.preventDefault();
//     const data = new FormData();
//     data.set("title", title);
//     data.set("summary", summary);
//     data.set("content", content);
//     if (files?.[0]) {
//       data.set("file", files[0]);
//     }

//     const response = await fetch(`${process.env.REACT_APP_URL}/post/${id}`, {
//       method: "PUT",
//       body: data,
//       credentials: "include",
//     });
//     if (response.ok) {
//       setRedirect(true);
//     } else {
//       console.error("Error updating post:", response.status);
//     }
//   }

//   if (redirect) {
//     return <Navigate to={`/post/${id}`} />;
//   }

//   return (
//     <div>
//       <form onSubmit={updatePost}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(ev) => setTitle(ev.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Summary"
//           value={summary}
//           onChange={(ev) => setSummary(ev.target.value)}
//         />
//         <input
//           type="file"
//           onChange={(ev) => setFiles(ev.target.files)}
//         />
//         <ReactQuill
//           value={content}
//           onChange={setContent}
//           modules={modules}
//           formats={formats}
//         />
//         <button style={{ marginTop: "5px" }}>Update post</button>
//       </form>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, Navigate } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };
// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ];

// export default function EditPost() {
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [content, setContent] = useState("");
//   const [files, setFiles] = useState("");
//   const [tags, setTags] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_URL}/post/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error fetching post.");
//         }
//         return response.json();
//       })
//       .then((postInfo) => {
//         setTitle(postInfo.title);
//         setSummary(postInfo.summary);
//         setContent(postInfo.content);
//         setSelectedTags(postInfo.tag.map((tag) => tag._id));
//       })
//       .catch((error) => {
//         console.error("Error fetching post:", error);
//       });

//     fetchTags();
//   }, [id]);

//   async function fetchTags() {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_URL}/tags`, {
//         credentials: "include",
//       });

//       if (response.ok) {
//         const tagsData = await response.json();
//         setTags(tagsData);
//       } else {
//         console.error("Error fetching tags:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching tags:", error);
//     }
//   }

//   async function updatePost(ev) {
//     ev.preventDefault();
//     const data = new FormData();
//     data.set("title", title);
//     data.set("summary", summary);
//     data.set("content", content);
//     selectedTags.forEach((tagId) => data.append("tag", tagId));
//     if (files?.[0]) {
//       data.set("file", files[0]);
//     }

//     const response = await fetch(`${process.env.REACT_APP_URL}/post/${id}`, {
//       method: "PUT",
//       body: data,
//       credentials: "include",
//     });
//     if (response.ok) {
//       setRedirect(true);
//     } else {
//       console.error("Error updating post:", response.status);
//     }
//   }

//   if (redirect) {
//     return <Navigate to={`/post/${id}`} />;
//   }

//   return (
//     <div>
//       <form onSubmit={updatePost}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(ev) => setTitle(ev.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Summary"
//           value={summary}
//           onChange={(ev) => setSummary(ev.target.value)}
//         />
//         <input
//           type="file"
//           onChange={(ev) => setFiles(ev.target.files)}
//         />
//         <ReactQuill
//           value={content}
//           onChange={setContent}
//           modules={modules}
//           formats={formats}
//         />
//         <div>
//           <label>Tags:</label>
//           <select
//             multiple
//             value={selectedTags}
//             onChange={(ev) => {
//               const selectedOptions = Array.from(ev.target.options)
//                 .filter((option) => option.selected)
//                 .map((option) => option.value);
//               setSelectedTags(selectedOptions);
//             }}
//           >
//             {tags.map((tag) => (
//               <option key={tag._id} value={tag._id}>
//                 {tag.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button style={{ marginTop: "5px" }}>Update post</button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

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
