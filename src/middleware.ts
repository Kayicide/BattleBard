import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type MetaData = { Role: string };

const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api/trpc/example*"];
const adminPaths = ["/admin*"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/|\\.)")))
  );
};

const isAdminPath = (path: string) => {
  return adminPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/|\\.)")))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const { userId, sessionClaims } = getAuth(request);

  if (!userId || !sessionClaims) {
    return NextResponse.redirect("/");
  }

  if (isAdminPath(request.nextUrl.pathname)) {
    const role = (sessionClaims.meta_data as MetaData).Role;
    if (role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)", "/"],
};
