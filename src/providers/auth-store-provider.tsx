"use client";

import { useAuthStore } from "@/libs/store/auth-store";
import { useEffect } from "react";

export default function AuthHydrator({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  useEffect(() => {
    if (
      !token ||
      (token.length === 0 && !localStorage.getItem("auth_storage"))
    ) {
      useAuthStore.getState().clearAuth();
    }
  }, [token]);

  return <>{children}</>;
}
