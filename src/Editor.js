import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useState } from "react"

export default function Editor({value, onChange}){
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
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



  return (
    <ReactQuill value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}/>
  )
}