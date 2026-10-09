"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/shared/forms/FormInput";
import { LoginInput, LoginSchema } from "../types/auth.schema";
import { Button } from "@/components/ui/button";
import { useLogin } from "../hooks/useAuthQueries";
import { useAuthStore } from "../store/authStore";

const LoginForm = () => {
  const router = useRouter();

  const { mutate, isPending } = useLogin();

  const methods = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginInput) => {
    mutate(data, {
      onSuccess: (response) => router.push("/"),
    });
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleLogin)}
        className="flex flex-col gap-6 w-full max-w-xs"
      >
        <h3 className="text-gray-600/70 font-semibold text-2xl">
          Login to your account
        </h3>
        <div className="flex flex-col gap-4">
          <FormInput name="email" placeholder="Enter your email" />
          <FormInput name="password" placeholder="Enter your password" />

          <div className="flex gap-2">
            <span>Don't have an account?</span>
            <Link
              href="/sign-up"
              className="font-medium text-blue-500 underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <Button
          type="submit"
          className="bg-blue-500/80 hover:bg-blue-500 text-md py-6"
        >
          Login
          {/* {isPending ? "Signing up ..." : "Sign Up"} */}
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
