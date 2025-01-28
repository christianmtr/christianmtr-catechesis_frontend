// src/components/DynamicFormModal.jsx
import React from "react";
import { Modal, Form, Input, Button } from "antd";

const DynamicFormModal = ({ isVisible, onClose, onSubmit, fields }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields(); // Limpia el formulario después de enviar
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Modal
      title="Agregar/Editar Elemento"
      visible={isVisible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Guardar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules || []}
          >
            <Input placeholder={field.placeholder || ""} />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default DynamicFormModal;
