import React, { useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./styles/Header.css";
import { ThemeProvider, useTheme } from "./ThemeProvider";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef();

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body").setAttribute("data-theme", "dark");
    } else {
      document.querySelector("body").setAttribute("data-theme", "light");
    }
  }, [theme]);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_URL}/profile`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userInfo) => {
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
      <Link to="/index" className="logo">
        Admin Dashboard
      </Link>
      <nav className="nav">
        {username && (
          <>
            <a href onClick={logout}>
              LogOut
            </a>
          </>
        )}
        <img
          src={theme === "dark" ? "sun.png" : "moon.png"}
          alt=""
          id="icon"
          onClick={toggleTheme}
        />
      </nav>
    </header>
  );
}
