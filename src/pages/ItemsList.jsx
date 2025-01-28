// src/pages/ItemList.jsx
import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
import DynamicFormModal from "../components/DynamicFormModal";
import apiService from "../api/apiService";
import useStore from "../store/store";

const ItemList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]); // Comienza con un array vacío
  const { inscriptions } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const childList = await apiService.getChildList();
        setData(childList); // Establecer los datos iniciales
      } catch (error) {
        console.error("Error al cargar la lista de elementos:", error);
      }
    };

    fetchData();
  }, []);

  // Configuración de las columnas de la tabla
  const columns = [
    {
      title: "Nombre",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Apellido",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "DNI",
      dataIndex: "national_id",
      key: "national_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teléfono",
      dataIndex: "phone_number",
      key: "phone_number",
    },{
      title: "Fecha de nacimiento",
      dataIndex: "birthday",
      key: "birthday",
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
      name: "inscription",
      label: "Inscripción",
      rules: [{ required: true, message: "El Inscripción es obligatorio" }],
      placeholder: "Inscripción",
      inputType: "select",
      options: inscriptions,
      initialValue: "",
    },
    {
      name: "first_name",
      label: "Nombres",
      rules: [{ required: true, message: "El nombre es obligatorio" }],
      placeholder: "Nombre del joven",
      inputType: "text",
      initialValue: "",
    },
    {
      name: "last_name",
      label: "Apellidos",
      rules: [{ required: true, message: "El apellido es obligatorio" }],
      placeholder: "Apellidos del joven",
      inputType: "text",
      initialValue: "",
    },
    {
      name: "national_id",
      label: "DNI",
      rules: [{ required: true, message: "El número de DNI es obligatorio", min: 8, max: 8 }],
      placeholder: "Número de DNI",
      inputType: "number",
      initialValue: "",
    },
    {
      name: "email",
      label: "Email",
      rules: [{ required: true, message: "El email es obligatorio" }],
      placeholder: "mi_nombre@example.com",
      inputType: "email",
      initialValue: "",
    },
    {
      name: "phone_number",
      label: "Teléfono",
      rules: [{ required: true, message: "El número de teléfono es obligatorio", min: 9, max: 9 }],
      placeholder: "999888777",
      inputType: "tel",
      initialValue: "",
    },
    {
      name: "birthday",
      label: "Cumpleaños",
      rules: [{ required: true, message: "La fecha de cumpleaños es obligatoria" }],
      placeholder: "",
      inputType: "date",
      initialValue: "",
    },
    {
      name: "baptism",
      label: "Bautizo",
      rules: [{ required: true, message: "El lugar de bautizo es obligatorio" }],
      placeholder: "Lugar de bautizo",
      inputType: "text",
      initialValue: "",
    },
    {
      name: "communion",
      label: "Comunión",
      rules: [{ required: true, message: "El lugar de primera comunión es obligatorio" }],
      placeholder: "Lugar de tu primera comunión",
      inputType: "text",
      initialValue: "",
    },
    {
      name: "user_type",
      label: "Tipo de usuario",
      rules: [{ required: true, message: "El tipo de usuario es obligatorio" }],
      placeholder: "Tipo de usuario",
      inputType: "hidden",
      initialValue: "CH",
    },
  ];

  // Manejo del envío del formulario
  const handleFormSubmit = async (values) => {
  try {
    // Esperar a que se complete la llamada a la API
    const newItem = await apiService.createChild(values);
    
    // Actualizar el estado solo cuando la llamada a la API sea exitosa
    setData((prevData) => (Array.isArray(prevData) ? [...prevData, newItem] : [newItem]));

    // Cerrar el modal después de agregar el elemento
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error al crear un elemento:", error);
  }
};

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1>Lista de Elementos</h1>
      <p>Aquí puedes ver y agregar nuevos elementos.</p>
      <DynamicTable
        data={data}
        columns={columns}
        scroll={{ x: 600 }}
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
