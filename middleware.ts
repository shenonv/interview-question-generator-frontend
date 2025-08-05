import { NextResponse, type NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/role-selection", "/interview", "/results", "/dashboard"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log(" Middleware check for:", pathname)

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    console.log(" Public route, allowing access")
    return NextResponse.next()
  }

  console.log(" Protected route, checking auth...")

  // For now, let the client-side AuthGuard handle authentication
  // since we're using JWT tokens stored in frontend state
  console.log(" Allowing access - auth will be checked client-side")
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
