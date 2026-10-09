import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const axiosApiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const AUTH_ROUTES = ["/login", "/sing-up"];

// axiosApiClient.interceptors.request.use((config) => {
//   const accessToken = useAuthStore.getState().accessToken;
//   if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

//   return config;
// });

axiosApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute = AUTH_ROUTES.some((route) =>
      originalRequest?.url?.includes(route),
    );
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        await axiosApiClient.post("/auth/refresh");
        return axiosApiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") window.location.href === "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
