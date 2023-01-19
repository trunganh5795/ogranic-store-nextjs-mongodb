// middleware.ts
import { NextResponse } from "next/server";
import User from "./models/userModel";
import type { NextRequest } from "next/server";
import { decodeToken } from "./helpers";

// This function can be marked `async` if using `await` inside
interface Request extends NextRequest {
  isAuth: boolean;
}
export async function middleware(req: Request) {
  console.log("Here middleware");
  req.isAuth = false;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("isAuth", "0");

  // You can also set request headers in NextResponse.rewrite
  let response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return response;
    }

    const payload = await decodeToken(token);
    if (!payload) {
      return response;
    }
    requestHeaders.set("isAuth", "1");
    requestHeaders.set("_id", payload.id as string);
    // You can also set request headers in NextResponse.rewrite
    response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
    return response;
  } catch (error) {
    response.cookies.delete("accessToken");
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/user/isauth", "/api/useractions/:path*", "/checkout"],
};
