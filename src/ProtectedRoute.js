import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext } from "./UserContext";

// Componente de enrutamiento personalizado para rutas protegidas
function ProtectedRoute({ path, element }) {
  const { userInfo } = useContext(UserContext);

  if (!userInfo || !userInfo.loggedIn) {
    // Si el usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    return <Navigate to="/index" />;
  }

  // Si el usuario ha iniciado sesión, permite el acceso a la ruta protegida
  return <Route path={path} element={element} />;
}

export default ProtectedRoute;
