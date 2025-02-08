import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
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
    }),
    {
      name: "auth-storage", // Nombre clave en LocalStorage
      getStorage: () => localStorage, // Usar localStorage (o sessionStorage si prefieres)
    }
  )
);

export default useStore;
