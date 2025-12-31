import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  // Not logged in → login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = decodeJWT(token);


  const path = request.nextUrl.pathname;

  // Admin-only route
  if (
    path.startsWith("/dashboard/usersmanagement") &&
    user?.role_name !== "Admin"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }


  if (
    path.startsWith("/dashboard/templates") &&
    !["Admin", "HR"].includes(user?.role_name)
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};