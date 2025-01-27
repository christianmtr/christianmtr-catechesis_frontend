// src/pages/ItemList.jsx
import React, { useState } from "react";
import { Button, Modal, Input } from "antd";

const ItemList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleAddItem = () => {
    console.log("Nuevo elemento agregado");
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Lista de Elementos</h1>
      <p>Aquí puedes ver y agregar nuevos elementos.</p>
      <Button type="primary" onClick={showModal}>
        Agregar Elemento
      </Button>
      <Modal
        title="Agregar Nuevo Elemento"
        visible={isModalOpen}
        onOk={handleAddItem}
        onCancel={handleCancel}
      >
        <Input placeholder="Nombre del elemento" />
      </Modal>
    </div>
  );
};

export default ItemList;
