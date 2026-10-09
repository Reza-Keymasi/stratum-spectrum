import { NextResponse } from "next/server";

declare global {
  interface User {
    _id: string;
    username: string;
    email: string;
    role: "admin" | "user";
    createdAt: Date;
    updatedAt: string;
  }
}
