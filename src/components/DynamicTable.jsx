import React from "react";
import { Table, Button } from "antd";

const DynamicTable = ({
  data,
  columns,
  scroll,
  onAddClick,
  expandable,
}) => {
  console.log(expandable);

  return (
    <div>
      <Table
        dataSource={Array.isArray(data) ? data : []} // Asegura que data siempre sea un array
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
        scroll={scroll}
        locale={{
          emptyText: "No hay datos para mostrar", // Mensaje cuando no hay datos
        }}
        expandable={{expandable}}
        tableLayout="fixed"
      />
      <Button type="primary" onClick={onAddClick} style={{ marginTop: "16px" }}>
        Agregar nuevo
      </Button>
    </div>
  );
};

export default DynamicTable;
