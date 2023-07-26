import { formatISO9075 } from "date-fns";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function PostPage(){
 const {id} = useParams();
 const [postInfo, SetPostInfo] = useState(null)
useEffect(() => {

  fetch(`${process.env.REACT_APP_URL}/post/${id}`)
  .then(response => {
    response.json().then(postInfo => {
      SetPostInfo(postInfo)
    })
  })
})

if (!postInfo) return ''
  return(
    <div className="post-page">

      <div className="image">
        <img src={`${process.env.REACT_APP_URL}/${postInfo.cover}`}  alt=""/>

      </div>
       <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">
          by {postInfo.author.username}
        </div>
      <h1>{postInfo.title}</h1>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>

  )
}