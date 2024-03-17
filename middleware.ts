import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/community",
    "/jobs",
  ],
  ignoredRoutes: ["/api/webhook"],
  // just for re deploy
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
