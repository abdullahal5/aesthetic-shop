import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = ["/admin/login"];
const JWT_SECRET = process.env.JWT_ACCESS_SECRET;

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
  username: string;
  role: string;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if it's an admin route
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "no_token");
    return NextResponse.redirect(loginUrl);
  }

  if (!JWT_SECRET) {
    console.error("JWT_ACCESS_SECRET is not configured");
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "config_error");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    if (decoded.role !== "admin" && decoded.role !== "super-admin") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    response.headers.set("X-User-Id", decoded.id);
    response.headers.set("X-User-Username", decoded.username);
    response.headers.set("X-User-Role", decoded.role);

    return response;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "session_expired");
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
