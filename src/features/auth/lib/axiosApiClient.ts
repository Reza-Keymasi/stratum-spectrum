import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const axiosApiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const AUTH_ROUTES = ["/login", "/sing-up"];
const NO_REFRESH_ROUTES = ["/auth/login", "/auth/sign-up", "/auth/refresh"];

let refreshPromise: Promise<unknown> | null = null;

axiosApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute = AUTH_ROUTES.some((route) =>
      originalRequest?.url?.includes(route),
    );

    const shouldSkip = NO_REFRESH_ROUTES.some((route) =>
      originalRequest?.url?.includes(route),
    );
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      !shouldSkip
    ) {
      originalRequest._retry = true;

      try {
        refreshPromise ??= axiosApiClient
          .post("/auth/refresh-token")
          .finally(() => {
            refreshPromise = null;
          });
        await refreshPromise;
        return axiosApiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        const onPublicPage = AUTH_ROUTES.some((p) =>
          window.location.pathname.startsWith(p),
        );
        if (!onPublicPage) window.location.href === "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
