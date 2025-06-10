import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("=== AUTH CHECK ===")

    const token = request.cookies.get("auth-token")?.value
    console.log("Token exists:", !!token)
    console.log("Token value:", token)

    if (!token) {
      console.log("❌ No token found")
      return NextResponse.json({ user: null })
    }

    try {
      // Decode simple token
      const sessionData = Buffer.from(token, "base64").toString()
      const user = JSON.parse(sessionData)

      console.log("✅ User decoded:", user)
      return NextResponse.json({ user })
    } catch (decodeError) {
      console.log("❌ Token decode error:", decodeError)
      return NextResponse.json({ user: null })
    }
  } catch (error) {
    console.error("❌ Auth check error:", error)
    return NextResponse.json({ user: null })
  }
}
