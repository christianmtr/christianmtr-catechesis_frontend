import { create } from "zustand";
import zukeeper from "zukeeper";

const useStore = create(
  zukeeper((set) => ({
    user: null,
    token: null,
    refresh: null,
    inscriptions: {},
    setUser: (user) => set({ user }),
    setToken: (token) => {
      set({ token });
      localStorage.setItem("token", token); // Guardar el token en el localStorage
    },
    setRefresh: (refresh) => {
      set({ refresh });
      localStorage.setItem("refresh", refresh); // Guardar el token en el localStorage
    },
    logout: () => {
      set({ user: null, token: null, refresh: null });
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    },
    setInscriptions: (inscriptions) => {
      set({ inscriptions });
    },
  }))
);

window.store = useStore;

export default useStore;
