import apiClient from "./apiClient";

export const login = async (data) => {
  const response = await apiClient.post("/login", data);
  return response.data;
};
