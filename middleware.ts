export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/blog", "/blog/:path*"],
};
