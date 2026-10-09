import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req?.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/habits/:path*", "/tasks/:path*", "/learning-paths/:path*"],
};
