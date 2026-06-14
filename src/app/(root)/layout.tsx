import type { Metadata } from "next";

import MainLayout from "@/shared/layouts/MainLayout";

export const metadata: Metadata = {
  title: "Personal Task Planner",
  description: "A local personal task and learning path management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
