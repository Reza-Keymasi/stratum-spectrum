import type { Metadata } from "next";

import AuthLayout from "@/features/auth/layout/AuthLayout";

export const metadata: Metadata = {
  title: "Personal Task Planner",
  description: "A local personal task and learning path management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
