"use client";

import { ReactNode, useEffect } from "react";

import { useAuthStore } from "../store/authStore";
import { configureTokenGetter } from "@/shared/lib/fetchHandler";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    configureTokenGetter(() => useAuthStore.getState().accessToken);
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
