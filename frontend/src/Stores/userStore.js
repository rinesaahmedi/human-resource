import { create } from "zustand";

const useUserStore = create((set) => ({
  username: null,
  setUser: (username) => set({ username }),
  clearUser: () => set({ username: null }),
}));

export default useUserStore;
