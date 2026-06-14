import { axiosApiClient } from "../lib/axiosApiClient";
import { SignUpInput } from "../types/auth.schema";

export const signUp = async (input: SignUpInput) => {
  return axiosApiClient.post("/auth/sign-up", input);
};
