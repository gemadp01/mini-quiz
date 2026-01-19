// src/lib/store/auth-store.ts

import { IUser } from "@/types/Auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearAuth: () => void;
  updateUser: (user: IUser) => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
      clearAuth: () => {
        set({ user: null });
      },
      updateUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
