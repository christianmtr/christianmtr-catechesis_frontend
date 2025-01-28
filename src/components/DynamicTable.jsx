// src/components/DynamicTable.jsx
import React from "react";
import { Table, Button } from "antd";

const DynamicTable = ({ data, columns, onAddClick }) => {
  return (
    <div>
      <Table
        dataSource={Array.isArray(data) ? data : []} // Asegura que data siempre sea un array
        columns={columns}
        rowKey={(record) => record.id}
        locale={{
          emptyText: "No hay datos para mostrar", // Mensaje cuando no hay datos
        }}
      />
      <Button type="primary" onClick={onAddClick} style={{ marginTop: "16px" }}>
        Agregar Elemento
      </Button>
    </div>
  );
};

export default DynamicTable;
