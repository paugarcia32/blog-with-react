import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header(){

  const [username, setUsername] = useState(null)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/profile`, {
      credentials: 'include',
    })
    .then(response => {
      // Verificar si la respuesta no es un JSON válido
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(userInfo => {
      // Verificar si el campo 'username' está presente en la respuesta
      if (userInfo && userInfo.username) {
        setUsername(userInfo.username);
      } else {
        setUsername(null);
      }
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
      setUsername(null);
    });
  }, []);

    function logout(){
      fetch(`${process.env.REACT_APP_URL}/logout`, {
        credentials: 'include',
        method: 'POST',
      })
    }

  return(
    <header>
        <Link to='/' className='logo'>My Blog</Link>
        <nav>
          {username && (
            <>
            <Link to ='/create'>Create new post</Link>
            <a onClick={logout}>LogOut</a>
            </>
          )}
          {!username && (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}

        </nav>
      </header>
  );
}