import {formatISO9075} from 'date-fns'
import {Link} from "react-router-dom";
export default function Post({_id, title, summary, cover, content, createdAt, author}){
  return(
    <div className='post'>
      <div className='image'>
        <Link to={`/post/${_id}`}>
                  <img src={`${process.env.REACT_APP_URL}/`+cover} alt=""/>
                </Link>
      </div>

        <div className='texts'>
        <h2>{title}</h2>
        <p className='info'>
          <a className='author' href>{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className='summary'>{summary}</p>
        </div>
      </div>
  );
}