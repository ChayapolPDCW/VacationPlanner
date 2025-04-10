import { NextResponse } from "next/server";

export async function middleware(request) {
//   if (request.nextUrl.pathname.startsWith("/plans/create")) {
    let response = await fetch("http://backend:5000/api/auth/check", {
      method: "POST",
      // credentials: "include",
      withCredentials: true,
      headers: request.headers,
      body: request.body,
    });

    let responseJson = await response.json();

    if (responseJson.status != true) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
//   }

  NextResponse.next();
}

export const config = {
  matcher: ["/profile/(.*)?", "/plans/(.*)?/(create|edit|delete)?"],
};
