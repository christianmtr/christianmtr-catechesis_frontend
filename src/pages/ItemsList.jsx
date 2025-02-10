import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import DynamicTable from "../components/DynamicTable";
import DynamicFormModal from "../components/DynamicFormModal";
import apiService from "../api/apiService";
import useStore from "../store/store";
import getFormFields from "../utils/formFields";
import getColums from "../utils/listColums";
import { useLocation } from 'react-router-dom'
import getDataForCurrentPath from "../utils/getDataForCurrentPath";

const ItemList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]); // Comienza con un array vacío
  const [loading, setLoading] = useState(true);
  const { inscriptions } = useStore();
  const location = useLocation();
  const currentPathname = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList = await getDataForCurrentPath(currentPathname);
        setData(dataList); // Establecer los datos iniciales
      } catch (error) {
        console.error("Error al cargar la lista de elementos:", error);
      } finally {
        if (inscriptions) {
          setLoading(false); // Oculta el loader cuando termina la carga
        }
      }
    };

    fetchData();
  }, []);

  // Configuración de las columnas de la tabla
  const columns = getColums(currentPathname);

  // Configuración de los campos del formulario
  const formFields = getFormFields(currentPathname, inscriptions);

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
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1>Lista de inscritos</h1>
      <p>Aquí puedes ver y agregar nuevos elementos.</p>
      
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <DynamicTable
              data={data}
              columns={columns}
              scroll={{ x: 800, y: 400 }} // Permite desplazamiento horizontal y mantiene el header fijo
              onAddClick={() => setIsModalOpen(true)}
            />
          </div>

          <DynamicFormModal
            isVisible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
            fields={formFields}
          />
        </>
      )}
    </div>

  );
};

export default ItemList;
