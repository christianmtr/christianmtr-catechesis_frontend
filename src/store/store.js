import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  token: null,
  refresh: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setRefresh: (refresh) => set({ refresh }),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    set({ user: null, token: null, refresh: null });
  },
}));

export default useStore;
