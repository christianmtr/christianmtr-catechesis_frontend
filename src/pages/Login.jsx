// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Divider, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useStore from "../store/store";
import apiService from "../api/apiService";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token, setUser, setToken, setRefresh } = useStore();

  // Redirigir al usuario si ya está autenticado
  useEffect(() => {
    if (token) {
      navigate("/"); // Redirigir al home si el usuario ya está autenticado
    }
  }, [token, navigate]);

  // Simular una llamada de inicio de sesión a una API
  const handleLogin = async (values) => {
    setLoading(true);
    message.destroy();
    try {
      const data = await apiService.login(values);

      if (!data.user.is_active) {
        message("This user is not active.", 5);
        return null;
      }

      // Guardar el token y el usuario en el global store
      setToken(data.access);
      setRefresh(data.refresh);
      setUser(data.user);

      // Redirigir al home
      message.success("Inicio de sesión exitoso", 3);
      navigate("/");
    } catch (err) {
      message.error("Error al iniciar sesión", err, 5);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff" }}>
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
      <Form onFinish={handleLogin} layout="vertical" initialValues={{ remember: true }}>
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: "Por favor ingrese su usuario" }]}
        >
          <Input prefix={<UserOutlined />}
              placeholder="Ingresa tu usuario"
              autoComplete="username"/>
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Por favor ingrese su contraseña" }]}
        >
          <Input.Password
          prefix={<LockOutlined />}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
      <Divider plain>Zona de Administradores</Divider>
      <Space align="center">Acceder al <a href="https://catechesis-backend.backend.catequesis.online/admin/" target="_blank">sitio de administración.</a></Space>
    </div>
  );
};

export default Login;
