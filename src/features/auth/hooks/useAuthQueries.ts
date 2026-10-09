import { useMutation } from "@tanstack/react-query";

import { LoginInput, SignUpInput } from "../types/auth.schema";
import { login, signUp } from "../services/authServices";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (input: SignUpInput) => signUp(input),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
  });
};
