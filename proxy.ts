import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/sign-in"];

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const loginUrl = new URL("/sign-in", request.url);

  const homeUrl = new URL("/", request.url);

  if (!cookie) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(loginUrl);
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in"],
};
