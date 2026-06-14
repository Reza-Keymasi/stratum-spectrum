"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/shared/forms/FormInput";
import { SignUpInput, SignUpSchema } from "../types/auth.schema";
import { Button } from "@/components/ui/button";
import { useSignUp } from "../hooks/useAuthQueries";

const SignUpForm = () => {
  const { mutate, isPending } = useSignUp();

  const methods = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
  });

  const handleSignUp = (data: SignUpInput) => {
    mutate(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSignUp)}
        className="flex flex-col gap-6 w-full max-w-xs"
      >
        <h3 className="text-gray-600/70 font-semibold text-2xl">
          Create your account
        </h3>
        <div className="flex flex-col gap-4">
          <FormInput name="username" placeholder="Enter your username" />
          <FormInput name="email" placeholder="Enter your email" />
          <FormInput name="password" placeholder="Enter your password" />
          <FormInput
            name="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500/80 hover:bg-blue-500 text-md py-6"
        >
          {isPending ? "Signing up ..." : "Sign Up"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
