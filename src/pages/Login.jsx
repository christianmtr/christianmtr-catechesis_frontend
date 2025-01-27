// src/pages/Login.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import useStore from "../store/store";

const Login = () => {
  const navigate = useNavigate();
  const { token, setUser, setToken } = useStore();

  // Redirigir al usuario si ya está autenticado
  useEffect(() => {
    if (token) {
      navigate("/"); // Redirigir al home si el usuario ya está autenticado
    }
  }, [token, navigate]);

  // Simular una llamada de inicio de sesión a una API
  const handleLogin = async (values) => {
    try {
      // Simular respuesta de API
      const fakeApiResponse = {
        user: { id: 1, name: "Usuario Demo", email: "demo@example.com" },
        token: "fake-jwt-token",
      };

      // Guardar los datos del usuario y el token en el store
      setUser(fakeApiResponse.user);
      setToken(fakeApiResponse.token);

      // Guardar el token en localStorage
      localStorage.setItem("token", fakeApiResponse.token);

      // Redirigir al home
      message.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      message.error("Error al iniciar sesión");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff" }}>
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
      <Form onFinish={handleLogin} layout="vertical">
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: "Por favor ingrese su usuario" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Por favor ingrese su contraseña" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
