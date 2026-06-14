import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { User } from "../types/auth.schema";
import { set } from "mongoose";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (user: User, accessToken: string) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setAuth: (user, accessToken) =>
        set(
          { user, accessToken, isAuthenticated: true },
          false,
          "auth/setAuth",
        ),

      setAccessToken: (accessToken) =>
        set({ accessToken }, false, "auth/setAccessToken"),

      clearAuth: () => set({ ...initialState }, false, "auth/clearAuth"),
    }),
    { name: "AuthStore" },
  ),
);
