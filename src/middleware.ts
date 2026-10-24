import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Custom domain middleware
 * When a request arrives on a non-BeassistLink domain (e.g. myname.com),
 * we rewrite it to /domain/[host] which resolves the user and renders their bio page.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";

  if (hostname === "beassist-link.com") {
    const redirectUrl = new URL(request.url);
    redirectUrl.host = "www.beassist-link.com";
    return NextResponse.redirect(redirectUrl, 301);
  }

  const MAIN_DOMAINS = [
    "beassist-link.com",
    "www.beassist-link.com",
    "localhost",
    ".vercel.app",
  ];

  const isMainDomain = MAIN_DOMAINS.some((d) => hostname.includes(d));
  if (isMainDomain) return NextResponse.next();

  // Custom domain : rewrite / to /domain/[hostname]
  const path = request.nextUrl.pathname;
  const rewriteUrl = new URL(
    `/domain/${encodeURIComponent(hostname)}${path === "/" ? "" : path}`,
    request.url
  );
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  // Run on all routes except API, Next internals and static assets
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
