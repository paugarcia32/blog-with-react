import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./styles/Header.css";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_URL}/profile`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
      },
    })
      .then((response) => {
        // Verificar si la respuesta no es un JSON válido
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userInfo) => {
        // Verificar si el campo 'username' está presente en la respuesta
        if (userInfo && userInfo.username) {
          setUserInfo(userInfo);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setUserInfo(null);
      });
  }, []);

  function logout() {
    fetch(`${process.env.REACT_APP_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <nav className="nav">
        <Link to="/index" className="logo">
          My Blog
        </Link>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a href onClick={logout}>
              LogOut
            </a>
          </>
        )}
        {/* {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )} */}
      </nav>
    </header>
  );
}
