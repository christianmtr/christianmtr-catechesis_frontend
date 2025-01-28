import apiClient from "./apiClient";

const apiService = {
  // Ejemplo: Login
  login: async (credentials) => {
    const response = await apiClient.post("/auth/token/", credentials);
    return response.data;
  },

  // Ejemplo: Obtener usuario autenticado
  getUserProfile: async (user_id) => {
    const response = await apiClient.get(`/core/users/${user_id}/`);
    return response.data;
  },

  // Ejemplo: Obtener lista de inscripciones
  getChildList: async () => {
    const response = await apiClient.get("/core/users/get_child_list/");
    return response.data;
  },

  // Ejemplo: Crear un aula
  createAula: async (data) => {
    const response = await apiClient.post("/aulas", data);
    return response.data;
  },

  // Ejemplo: Obtener lista de catequistas
  getCatequistas: async () => {
    const response = await apiClient.get("/catequistas");
    return response.data;
  },

  // Otros métodos...
};

export default apiService;
