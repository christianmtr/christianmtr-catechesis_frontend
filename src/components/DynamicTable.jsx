import React from "react";
import { Table, Button, Flex, Divider } from "antd";

const DynamicTable = ({ data, columns, scroll, onAddClick }) => {

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
        expandable={{
          expandedRowRender: (record) => (
            <Flex gap="middle" vertical={false}>
              <span
                style={{
                  margin: 0,
                  width: "50%",
                  whiteSpace: "pre-line",
                }}
              >
                <b>Notas adicionales:</b>
                <p>{record.additional_notes}</p>
              </span>
              <Divider type="vertical" style={{ borderColor: '#7cb305' }}/>
              <span
                style={{
                  margin: 0,
                  width: "50%",
                  whiteSpace: "pre-line",
                }}
              >
                <b>Enfermedades/alergias:</b>
                <p>{record.illness}</p>
              </span>
            </Flex>
            // <>
            //   <p
            //     style={{
            //       margin: 0,
            //     }}
            //   >
            //     {record.additional_notes}
            //   </p>
            //   <p
            //     style={{
            //       margin: 0,
            //     }}
            //   >
            //     {record.illness}
            //   </p>
            // </>
          ),
          rowExpandable: (record) => true,
        }}
        tableLayout="fixed"
      />
      <Button type="primary" onClick={onAddClick} style={{ marginTop: "16px" }}>
        Agregar nuevo
      </Button>
    </div>
  );
};

export default DynamicTable;
