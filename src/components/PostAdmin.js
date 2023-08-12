// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const PostAdmin = () => {
//   const [postCount, setPostCount] = useState(0);
//   const [postNames, setPostNames] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_URL}/post/count`)
//       .then((response) => response.json())
//       .then((data) => setPostCount(data.count))
//       .catch((error) => console.error("Error fetching post count:", error));

//     fetch(`${process.env.REACT_APP_URL}/post/names`)
//       .then((response) => response.json())
//       .then((data) => setPostNames(data))
//       .catch((error) => console.error("Error fetching post names:", error));
//   }, []);

//   return (
//     <div>
//       <h3>Number of Posts: {postCount}</h3>
//       <h3>Post Names:</h3>
//       <ul>
//         {postNames.map((name, index) => (
//           <li key={index}>{name}</li>
//         ))}
//       </ul>
//       <Link to="/create">Create new post</Link>
//     </div>
//   );
// };

// export default PostAdmin;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostAdmin = () => {
  const [postCount, setPostCount] = useState(0);
  const [postNames, setPostNames] = useState([]);
  const [loading, setLoading] = useState(true); // Agregamos un estado de carga
  const [error, setError] = useState(null); // Agregamos un estado de error

  useEffect(() => {
    setLoading(true); // Iniciamos el estado de carga

    fetch(`${process.env.REACT_APP_URL}/post/count`)
      .then((response) => response.json())
      .then((data) => {
        setPostCount(data.totalPosts);
        setLoading(false); // Cambiamos el estado de carga a falso cuando se obtienen los datos
      })
      .catch((error) => {
        setError(error); // Manejamos el error estableciendo el estado de error
        setLoading(false); // Cambiamos el estado de carga a falso en caso de error
      });

    fetch(`${process.env.REACT_APP_URL}/post/names`)
      .then((response) => response.json())
      .then((data) => {
        setPostNames(data);
      })
      .catch((error) => {
        setError(error); // Manejamos el error estableciendo el estado de error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h3>Number of Posts: {postCount}</h3>
      <h3>Post Names:</h3>
      <ul>
        {postNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <Link to="/create">Create new post</Link>
    </div>
  );
};

export default PostAdmin;
