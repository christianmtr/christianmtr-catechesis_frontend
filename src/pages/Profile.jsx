import React, { useState } from "react";
import { Card, Button, Modal, Form, Input, DatePicker, message } from "antd";
import useStore from "../store/store";
import dayjs from "dayjs";
import apiService from "../api/apiService";

const Profile = () => {
  const { user, setUser } = useStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profileForm] = Form.useForm();
  const [usernameForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Modal del perfil
  const showProfileModal = () => {
    profileForm.setFieldsValue({
      ...user,
      birthday: user.birthday ? dayjs(user.birthday) : null,
    });
    setIsProfileModalOpen(true);
  };
  const handleProfileCancel = () => setIsProfileModalOpen(false);

  // Modal de usuario
  const showUsernameModal = () => {
    usernameForm.setFieldsValue({ username: user.username });
    setIsUsernameModalOpen(true);
  };
  const handleUsernameCancel = () => setIsUsernameModalOpen(false);

  // Modal de contraseña
  const showPasswordModal = () => setIsPasswordModalOpen(true);
  const handlePasswordCancel = () => setIsPasswordModalOpen(false);

  // Guardar cambios en perfil
  const handleProfileSave = async (values) => {
    values.birthday = values.birthday ? dayjs(values.birthday).format("YYYY-MM-DD") : null;
    const updatedUser = await apiService.updateUser(user.id, values);
    setUser({ ...user, ...updatedUser });
    setIsProfileModalOpen(false);
    message.success("Perfil actualizado");
  };

  // Guardar nuevo nombre de usuario
  const handleUsernameSave = async (values) => {
    const updatedUser = await apiService.updateUser(user.id, values);
    setUser({ ...user, username: updatedUser.username });
    setIsUsernameModalOpen(false);
    message.success("Nombre de usuario actualizado");
  };

  // Cambiar contraseña
  const handlePasswordSave = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Las contraseñas no coinciden");
      return;
    }
    await apiService.changePassword(user.id, values);
    message.success("Contraseña actualizada correctamente");
    setIsPasswordModalOpen(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <Card
        title="Perfil del Usuario"
        extra={<Button onClick={showProfileModal}>Editar</Button>}
      >
        <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
        <p>
          <strong>Usuario:</strong> {user.username} 
          <Button size="small" style={{ marginLeft: "10px" }} onClick={showUsernameModal}>Editar</Button>
        </p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone_number || "No disponible"}</p>
        <p><strong>Dirección:</strong> {user.address || "No disponible"}</p>
        <p><strong>Fecha de nacimiento:</strong> {user.birthday || "No disponible"}</p>
        <p><strong>Estado civil:</strong> {user.verbose_civil_status}</p>
        <p><strong>Tipo de usuario:</strong> {user.verbose_user_type}</p>
        <p><strong>Último acceso:</strong> {dayjs(user.last_login).format("DD/MM/YYYY HH:mm")}</p>
        <Button type="primary" danger onClick={showPasswordModal}>Cambiar Contraseña</Button>
      </Card>

      {/* Modal para editar el perfil */}
      <Modal
        title="Editar Perfil"
        open={isProfileModalOpen}
        onCancel={handleProfileCancel}
        onOk={() => profileForm.submit()}
      >
        <Form form={profileForm} layout="vertical" onFinish={handleProfileSave}>
          <Form.Item name="first_name" label="Nombre">
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Apellido">
            <Input />
          </Form.Item>
          <Form.Item name="phone_number" label="Teléfono">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Dirección">
            <Input />
          </Form.Item>
          <Form.Item name="birthday" label="Fecha de Nacimiento">
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para cambiar nombre de usuario */}
      <Modal
        title="Cambiar Nombre de Usuario"
        open={isUsernameModalOpen}
        onCancel={handleUsernameCancel}
        onOk={() => usernameForm.submit()}
      >
        <Form form={usernameForm} layout="vertical" onFinish={handleUsernameSave}>
          <Form.Item name="username" label="Nuevo Nombre de Usuario" rules={[{ required: true, message: "Este campo es obligatorio" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para cambiar contraseña */}
      <Modal
        title="Cambiar Contraseña"
        open={isPasswordModalOpen}
        onCancel={handlePasswordCancel}
        onOk={() => passwordForm.submit()}
      >
        <Form form={passwordForm} layout="vertical" onFinish={handlePasswordSave}>
          <Form.Item name="currentPassword" label="Contraseña Actual" rules={[{ required: true, message: "Ingrese su contraseña actual" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="Nueva Contraseña" rules={[{ required: true, message: "Ingrese su nueva contraseña" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirmar Nueva Contraseña" rules={[{ required: true, message: "Confirme su nueva contraseña" }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
