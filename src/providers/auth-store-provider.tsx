"use client";

import { useAuthStore } from "@/libs/store/auth-store";
import authServices from "@/services/auth-service";
import { useEffect } from "react";

export default function AuthHydrator({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const { setToken, setUser, clearAuth } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const hydrate = async () => {
      if (!token) {
        clearAuth();
        return;
      }

      try {
        const response = await authServices.getCurrentUser(token);
        if (!response.data.success) throw new Error("invalid token");

        if (!user) {
          setUser(response.data.data);
        }
      } catch {
        clearAuth();
      }
    };

    hydrate();
  }, [token, setToken, clearAuth, user, setUser]);

  return children;
}
