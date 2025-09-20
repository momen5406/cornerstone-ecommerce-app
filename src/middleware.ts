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
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const baseUrl =
    process.env.NEXTAUTH_URL || process.env.NEXT_URL || req.nextUrl.origin;

  // 🔒 Protect pages
  if (protectedPages.some((page) => pathname.startsWith(page))) {
    if (!token) {
      const redirectUrl = new URL("/login", baseUrl);
      redirectUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // 🚫 Block auth pages for logged-in users
  if (authPages.includes(pathname)) {
    if (token) {
      const redirectUrl = new URL("/", baseUrl);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
