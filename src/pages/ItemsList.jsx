// src/pages/ItemList.jsx
import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
import DynamicFormModal from "../components/DynamicFormModal";
import apiService from "../api/apiService";

const ItemList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]); // Comienza con un array vacío

  useEffect(() => {
    const child_list = apiService.getChildList();
    setData(child_list);
  }, []);

  // Configuración de las columnas de la tabla
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Bautizo",
      dataIndex: "baptism",
      key: "baptism",
    },
    {
      title: "Comunión",
      dataIndex: "communion",
      key: "communion",
    },
  ];

  // Configuración de los campos del formulario
  const formFields = [
    {
      name: "first_name",
      label: "Nombres",
      rules: [{ required: true, message: "El nombre es obligatorio" }],
      placeholder: "Nombre del joven",
      inputType: "text",
    },
    {
      name: "last_name",
      label: "Apellidos",
      rules: [{ required: true, message: "El apellido es obligatorio" }],
      placeholder: "Apellidos del joven",
      inputType: "text",
    },
    {
      name: "national_id",
      label: "DNI",
      rules: [{ required: true, message: "El número de DNI es obligatorio" }],
      placeholder: "Número de DNI",
      inputType: "number",
    },
    {
      name: "email",
      label: "Email",
      rules: [{ required: true, message: "El email es obligatorio" }],
      placeholder: "mi_nombre@example.com",
      inputType: "email",
    },
    {
      name: "phone_number",
      label: "Teléfono",
      rules: [{ required: true, message: "El número de teléfono es obligatorio" }],
      placeholder: "999888777",
      inputType: "number",
    },
    {
      name: "baptism",
      label: "Bautizo",
      rules: [{ required: true, message: "El lugar de bautizo es obligatorio" }],
      placeholder: "Lugar de bautizo",
      inputType: "text",
    },
    {
      name: "communion",
      label: "Comunión",
      rules: [{ required: true, message: "El lugar de primera comunión es obligatorio" }],
      placeholder: "Lugar de tu primera comunión",
      inputType: "text",
    },
  ];

  // Manejo del envío del formulario
  const handleFormSubmit = (values) => {
    const newItem = {
      id: Date.now(), // Genera un ID único (esto debería ser manejado por el backend en una app real)
      ...values,
    };
    setData((prevData) => [...prevData, newItem]); // Agregar nuevo elemento
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Lista de Elementos</h1>
      <p>Aquí puedes ver y agregar nuevos elementos.</p>
      <DynamicTable
        data={data}
        columns={columns}
        onAddClick={() => setIsModalOpen(true)}
      />
      <DynamicFormModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        fields={formFields}
      />
    </div>
  );
};

export default ItemList;
