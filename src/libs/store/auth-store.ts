// src/lib/store/auth-store.ts

import { IUser } from "@/types/Auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthState {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
  updateUser: (user: IUser) => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => {
        set({ user });
      },
      setToken: (token) => {
        set({ token });
      },
      clearAuth: () => {
        set({ user: null, token: null });
      },
      updateUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
