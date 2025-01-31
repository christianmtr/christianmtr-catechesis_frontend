// src/pages/ItemList.jsx
import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
import DynamicFormModal from "../components/DynamicFormModal";
import apiService from "../api/apiService";
import useStore from "../store/store";
import getFormFields from "../utils/formFields";
import getColums from "../utils/listColums";
import { useLocation } from 'react-router-dom'

const ItemList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]); // Comienza con un array vacío
  const { inscriptions } = useStore();
  const location = useLocation();

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
  const columns = getColums(location.pathname);

  // Configuración de los campos del formulario
  const formFields = getFormFields(location.pathname, inscriptions);

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
