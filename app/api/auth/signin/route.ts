import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("=== LOGIN ATTEMPT ===")
    console.log("Email:", email)
    console.log("Password:", password)

    // Simple hardcoded check
    if (email === "admin@interview.app" && password === "admin123") {
      console.log("✅ Credentials match!")

      const user = {
        id: "admin-001",
        email: "admin@interview.app",
        fullName: "Admin User",
        avatar: "",
      }

      // Create simple session token (just user data encoded)
      const sessionData = JSON.stringify(user)
      const token = Buffer.from(sessionData).toString("base64")

      console.log("Generated token:", token)

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user,
      })

      // Set cookie
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: false, // Allow HTTP for development
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      console.log("✅ Cookie set successfully")
      return response
    } else {
      console.log("❌ Invalid credentials")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("❌ Login error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
