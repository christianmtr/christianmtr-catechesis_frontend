// src/layout/Layout.jsx
import React, {useEffect} from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import useStore from "../store/store";
import apiService from "../api/apiService";

const { Header, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, logout, setInscriptions } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inscriptionsList = await apiService.getInscriptions();
        setInscriptions(inscriptionsList); // Establecer los datos iniciales
      } catch (error) {
        console.error("Error al cargar la lista de inscripciones:", error);
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      // Aquí puedes manejar la lógica de cierre de sesión
      logout();
      navigate("/login");
    } else {
      navigate(`/${key}`);
    }
  };

  let optionsMenu = [
    { label: "Inicio", key: "" },
    { label: "Inscripciones", key: "inscripciones" },
  ];
  if (user?.user_type == "A") {
    optionsMenu.push({ label: "Catequistas", key: "catequistas" });
    optionsMenu.push({ label: "Aulas", key: "aulas" });
  }

  const userMenu = (
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
            items={optionsMenu}
            onClick={(e) => navigate(`/${e.key}`)}
          />
        </div>

        {/* Sección derecha: usuario */}
        <Dropdown menu={userMenu} trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Avatar src="/default-avatar.png" size="large" />
            <span style={{ marginLeft: "10px", fontWeight: "500" }}>
              {user?.first_name || "Usuario"}
            </span>
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
            maxWidth: "1000px", // Limita el ancho de la caja centrada
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
