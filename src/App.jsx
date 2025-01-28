// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout"; // El layout principal
import Home from "./pages/Home"; // Página Home
import ItemsList from "./pages/ItemsList"; // Página Lista de Elementos
import Login from "./pages/Login"; // Página Login
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      {/* Ruta de login (fuera del layout) */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas dentro del layout */}
      <Route path="/" element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="inscripciones" element={<ItemsList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
