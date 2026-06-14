import { z } from "zod";

const UserRole = ["user", "admin"] as const;

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(1, "User name is required")
      .max(20, "Username must have max 20 character"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "passwrod must have at least 8 characters")
      .regex(/[A-Z]/, "At least one uppercase letter")
      .regex(/[0-9]/, "At least one number")
      .regex(/^[a-zA-Z0-9]/, "At least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });

export const UserSchema = z.object({
  username: z.string(),
  email: z.email(),
  role: z.enum(UserRole),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type User = z.infer<typeof UserSchema>;
