import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define routes that don't require auth
const publicRoutes = ["/login", "/register"];

export const config = {
  matcher: [
    // Match everything except API, static assets, or public files
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const session = await getToken({ req: request });

  const isLocalhost = hostname === "localhost:3000";
  const isSubdomain = hostname.endsWith(".localhost:3000");

 
  if (isSubdomain) {
    const subdomain = hostname.replace(".localhost:3000", "");
    const url = request.nextUrl.clone();
    url.pathname = `/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }


  // if (!isLocalhost) {
  //   return NextResponse.next(); 
  // }

  if (!session && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
