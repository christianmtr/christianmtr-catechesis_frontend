import React from "react";
import { Table, Tooltip, Button } from "antd";

const DynamicTable = ({ data, columns, scroll, onAddClick }) => {
  const newColumns = columns.map(item => {
    if (item.ellipsis) {
      item.render = (additional_notes) => <Tooltip placement="bottomLeft" title={additional_notes} trigger={["hover", "click", "focus"]}>{additional_notes}</Tooltip>
    }
    return item;
  });

  return (
    <div>
      <Table
        dataSource={Array.isArray(data) ? data : []} // Asegura que data siempre sea un array
        columns={newColumns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
        scroll={scroll}
        locale={{
          emptyText: "No hay datos para mostrar", // Mensaje cuando no hay datos
        }}
      />
      <Button type="primary" onClick={onAddClick} style={{ marginTop: "16px" }}>
        Agregar nuevo
      </Button>
    </div>
  );
};

export default DynamicTable;
