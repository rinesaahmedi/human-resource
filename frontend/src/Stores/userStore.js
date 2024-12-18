import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist((set, get) => ({
    user: null,
    accessToken: "",
    isSignedIn: () => !!get().accessToken,
    setUser: (user) => set({ user }),
    setAccessToken: (token) => set({ accessToken: token }),
    clearUser: () => set({ user: null, accessToken: "" }),
  }))
);

export default useUserStore;
