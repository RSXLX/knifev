import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ok = await isValidAdminToken(request.cookies.get(ADMIN_COOKIE)?.value);

  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
    if (!ok) return NextResponse.json({ error: "需要登录" }, { status: 401 });
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/admin/login" && ok) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
