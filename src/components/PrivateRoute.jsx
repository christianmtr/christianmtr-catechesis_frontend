// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  if (!token) {
    // Si no hay token, redirigir al login
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderizar el contenido protegido
  return <Outlet />;
};

export default PrivateRoute;
