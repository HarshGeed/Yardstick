import { auth } from "@/auth"

export default auth((req) => {
  // req.auth contains the session data
  if (!req.auth) {
    // Redirect to login if not authenticated
    return Response.redirect(new URL("/auth/login", req.url))
  }
})

export const config = {
  matcher: [
    "/",                 // protect homepage
    "/dashboard/:path*", // protect dashboard pages  
    "/profile/:path*",   // protect profile pages
  ],
}