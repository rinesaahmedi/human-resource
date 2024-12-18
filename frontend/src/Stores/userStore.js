import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist((set, get) => ({
    username: null,
    accessToken: "",
    isSignedIn: () => !!get().accessToken,
    setUser: (username) => set({ username }),
    setAccessToken: (token) => set({ accessToken: token }),
    clearUser: () => set({ username: null }),
  }))
);

export default useUserStore;
