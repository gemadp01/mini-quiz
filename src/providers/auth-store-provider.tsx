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

  useEffect(() => {
    if (!token) {
      clearAuth();
      return;
    }

    setToken(token);

    authServices
      .getCurrentUser(token)
      .then((res) => setUser(res.data))
      .catch(() => clearAuth());
  }, [token, setToken, setUser, clearAuth]);

  return children;
}
