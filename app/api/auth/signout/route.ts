import { NextResponse } from "next/server"

export async function POST() {
  console.log("=== LOGOUT ===")

  const response = NextResponse.json({ message: "Logged out" })

  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  })

  console.log("✅ Logout successful")
  return response
}
