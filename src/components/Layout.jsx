// src/layout/Layout.jsx
import React from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      // Aquí puedes manejar la lógica de cierre de sesión
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate(`/${key}`);
    }
  };

  const menu = (
    <Menu
      items={[
        { label: "Ver Perfil", key: "profile" },
        { label: "Cerrar Sesión", key: "logout" },
      ]}
      onClick={handleMenuClick}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header fijo */}
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "0 20px",
        }}
      >
        {/* Sección izquierda: logo y navegación */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Mi Logo
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            style={{ border: "none" }}
            items={[
              { label: "Home", key: "" },
              { label: "Lista de Elementos", key: "list" },
            ]}
            onClick={(e) => navigate(`/${e.key}`)}
          />
        </div>

        {/* Sección derecha: usuario */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Avatar src="/default-avatar.png" size="large" />
            <span style={{ marginLeft: "10px", fontWeight: "500" }}>Usuario</span>
          </div>
        </Dropdown>
      </Header>

      {/* Contenido principal */}
      <Content
        style={{
          marginTop: "64px", // Deja espacio para el header fijo
          padding: "20px",
          display: "flex",
          justifyContent: "center", // Centra el contenido horizontalmente
          alignItems: "center", // Centra el contenido verticalmente
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "800px", // Limita el ancho de la caja centrada
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
