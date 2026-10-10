"use client";

import { useState, useEffect, ReactNode } from "react";

import { getMe } from "../services/authServices";
import { useAuthStore } from "..";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMe()
      .then((res) => useAuthStore.getState().setUser(res.data.user))
      .catch(() => useAuthStore.getState().clearAuth())
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return null;

  return <>{children}</>;
};

export default AuthProvider;
