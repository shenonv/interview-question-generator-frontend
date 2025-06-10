import { NextResponse, type NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/role-selection", "/interview", "/results", "/dashboard"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log("🔍 Middleware check for:", pathname)

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    console.log("✅ Public route, allowing access")
    return NextResponse.next()
  }

  console.log("🔒 Protected route, checking auth...")

  const token = request.cookies.get("auth-token")?.value
  console.log("Token exists:", !!token)

  if (!token) {
    console.log("❌ No token, redirecting to login")
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  try {
    // Simple token verification - just check if it can be decoded
    const sessionData = Buffer.from(token, "base64").toString()
    const user = JSON.parse(sessionData)

    if (user && user.id) {
      console.log("✅ Valid token, allowing access")
      return NextResponse.next()
    } else {
      throw new Error("Invalid user data")
    }
  } catch (error) {
    console.log("❌ Invalid token, redirecting to login")
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
