import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = "/api";

export const axiosApiClient = axios.create({ baseURL: BASE_URL });

axiosApiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log(error);
    }
  },
);
