import { useMutation } from "@tanstack/react-query";

import { SignUpInput } from "../types/auth.schema";
import { signUp } from "../services/authServices";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (input: SignUpInput) => signUp(input),
    onSuccess: () => console.log("SIGN_UP"),
  });
};
