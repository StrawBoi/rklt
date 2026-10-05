import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, isValidLocale } from "./lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths and public files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a supported locale
  const pathnameLocale = pathname.split("/")[1];
  if (isValidLocale(pathnameLocale)) {
    // Already has locale
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", pathnameLocale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // Determine preferred locale
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let targetLocale = defaultLocale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    const acceptLanguage = request.headers.get("accept-language") || "";
    if (acceptLanguage.toLowerCase().includes("ar")) {
      targetLocale = "ar";
    }
  }

  // Rewrite or redirect to the locale-prefixed URL
  const targetUrl = new URL(
    `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
    request.url
  );
  targetUrl.search = request.nextUrl.search;
  return NextResponse.redirect(targetUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};
