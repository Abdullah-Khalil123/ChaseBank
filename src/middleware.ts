import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for auth token in cookies
  const authCookie = request.cookies.get("authToken")?.value;

  const publicPaths = ["/login", "/signup", "/forgot-password"];
  const protectedPaths = [
    "/overview",
    "/summary",
    "/accounts",
    "/dashboard",
    "/transactions",
  ];

  const path = request.nextUrl.pathname;

  // Check if the path is public or protected
  const isPathPublic = publicPaths.some((publicPath) =>
    path.startsWith(publicPath)
  );

  const isPathProtected = protectedPaths.some((protectedPath) =>
    path.startsWith(protectedPath)
  );

  // Only apply middleware logic to paths we care about
  if (!isPathPublic && !isPathProtected) {
    return NextResponse.next();
  }

  const isAuthenticated = !!authCookie;

  // Debug info in response headers (will appear in browser network tab)
  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");
  response.headers.set("x-middleware-path", path);
  response.headers.set("x-middleware-is-public", isPathPublic.toString());
  response.headers.set(
    "x-middleware-is-authenticated",
    isAuthenticated.toString()
  );

  // Redirect authenticated users away from public pages
  if (isPathPublic && isAuthenticated) {
    // return NextResponse.redirect(new URL("/overview", request.url));
  }

  // Redirect unauthenticated users to login with the redirect URL
  if (isPathProtected && !isAuthenticated) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectUrl", path);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

// Match all paths so we can apply our own logic
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
