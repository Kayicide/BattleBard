import {
  clerkClient,
  getAuth,
  withClerkMiddleware,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api/trpc/example*"];
const adminPaths = ["/admin*"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/|\\.)")))
  );
};

const isAdmin = (path: string) => {
  return adminPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/|\\.)")))
  );
};

export default withClerkMiddleware(async (request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.redirect("/");
  }

  if (isAdmin(request.nextUrl.pathname)) {
    let user = await clerkClient.users.getUser(userId);
    let role = user.publicMetadata.Role;
    if (role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
