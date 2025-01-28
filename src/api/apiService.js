import apiClient from "./apiClient";

const apiService = {
  login: async (credentials) => {
    const response = await apiClient.post("/auth/token/", credentials);
    return response.data;
  },

  getUserProfile: async (user_id) => {
    const response = await apiClient.get(`/core/users/${user_id}/`);
    return response.data;
  },

  getChildList: async () => {
    const response = await apiClient.get("/core/users/get_child_list/");
    return response.data;
  },

  createChild: async (data) => {
    const response = await apiClient.post("/core/users/", data);
    return response.data;
  },

  getInscriptions: async () => {
    const response = await apiClient.get("/core/inscriptions/");
    return response.data;
  },

  // Otros métodos...
};

export default apiService;
