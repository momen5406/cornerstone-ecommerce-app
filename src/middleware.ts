import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPages = [
  "/cart",
  "/account",
  "/wishlist",
  "/address",
  "/allorders",
];
const authPages = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 🔒 Protect pages
  if (protectedPages.some((page) => pathname.startsWith(page))) {
    if (!token) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 🚫 Block auth pages for logged-in users
  if (authPages.includes(pathname)) {
    if (token) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/account",
    "/wishlist",
    "/address",
    "/allorders",
    "/login",
    "/register",
  ],
};
