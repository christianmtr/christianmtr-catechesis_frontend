// src/components/DynamicFormModal.jsx
import React from "react";
import { Modal, Form, Input, Button, Select, DatePicker } from "antd";

const { TextArea } = Input;

const DynamicFormModal = ({ isVisible, onClose, onSubmit, fields }) => {
  const [form] = Form.useForm();

  const renderField = (field) => {
    switch (field.inputType) {
      case "select":
        return <Select options={field.options.map(item => {
          return {value: item.id, label: `${item.verbose_type}-${item.year}`}
        })} />;
      case "date":
        return (
          <DatePicker
            mode="date"
            format="YYYY/MM/DD"
            style={{ width: "100%" }}
          />
        );
      case "textArea":
        return <TextArea rows={6} placeholder={field.placeholder || ""} />
      default:
        return (
          <Input
            placeholder={field.placeholder || ""}
            type={field.inputType || "text"} // Usa "text" como valor predeterminado
          />
        );
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields(); // Limpia el formulario después de enviar
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Modal
      title="Agregar/Editar Elemento"
      open={isVisible}
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
            hidden={field.inputType == "hidden"}
            initialValue={field.initialValue}
          >
            {renderField(field)}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default DynamicFormModal;
