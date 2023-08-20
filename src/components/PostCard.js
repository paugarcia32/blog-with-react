import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import React from 'react'



export default function Post({ _id, title, summary, cover, content, createdAt, author, tag }) {
  // Función para extraer los títulos de los tags y unirlos en una cadena
  const getTagTitles = () => tag.map((tag) => tag.title).join(' ');

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`${process.env.REACT_APP_URL}/${cover}`} alt="" />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2 className='title'>{title}</h2>
        </Link>

        <div className="info">
          <Link className="author" to={'/about'}>
            {author.username}
          </Link>
          <time>{formatISO9075(new Date(createdAt))}</time>
          <span className="tags-post">{getTagTitles()}</span>
        </div>

        <p className="summary">{summary}</p>
      </div>


    </div>
  );
}