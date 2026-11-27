// Auth proxy for the blog. The blog is currently disabled (see app/_blog);
// these routes 404 until it is re-enabled.
export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/blog", "/blog/:path*"],
};
