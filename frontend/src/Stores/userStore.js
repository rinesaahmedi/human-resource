import { create } from "zustand";

const useUserStore = create((set) => ({
  username: null,
  accessToken: "",
  setUser: (username) => set({ username }),
  setAccessToken: (token) => set({ accessToken: token }),
  clearUser: () => set({ username: null }),
}));

export default useUserStore;
