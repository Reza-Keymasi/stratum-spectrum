import { AxiosResponse } from "axios";
import { axiosApiClient } from "../lib/axiosApiClient";
import { LoginInput, SignUpInput } from "../types/auth.schema";

export const signUp = async (input: SignUpInput) => {
  return axiosApiClient.post("/auth/sign-up", input);
};

export const login = async (
  input: LoginInput,
): Promise<AxiosResponse<{ user: User; expiresIn: number }>> => {
  return axiosApiClient.post("/auth/login", input);
};

export const getMe = (): Promise<AxiosResponse<{ user: User }>> => {
  return axiosApiClient.get("/auth/me");
};

export const logout = () => {
  return axiosApiClient.post("/auth/logout");
};
