import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/profile`, {
      credentials: "include",
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

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_URL}/profile`, {
  //     credentials: "include",
  //   }).then((response) => {
  //     response.json().then((userInfo) => {
  //       setUserInfo(userInfo);
  //     });
  //   });
  // });

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
      <Link to="/index" className="logo">
        My Blog
      </Link>
      <nav>
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
