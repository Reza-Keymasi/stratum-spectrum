"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogout } from "../hooks/useAuthQueries";

const LogoutBtn = () => {
  const router = useRouter();
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => router.push("/login"),
    });
  };
  return (
    <Button
      className="flex items-center justify-start gap-3 text-black mb-2 cursor-pointer"
      variant="ghost"
      onClick={handleLogout}
    >
      <LogOut className="size-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutBtn;
