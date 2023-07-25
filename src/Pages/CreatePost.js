import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useState } from "react"


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

  async function createNewPost(ev){
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])

    ev.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_URL}/post`, {
      method: 'POST',
      body: data,

    })
    await response.json()
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
        <input type="file"

        onChange={ev => setFile(ev.target.files)}
        />
        <ReactQuill value={content}
        onChange={newValue => setContent(newValue)}
        modules={modules}
        formats={formats}/>
        <button style={{marginTop: '5px'}}>Create post</button>
      </form>
    </div>
  )
}