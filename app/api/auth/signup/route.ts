import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Simple token generation without JWT
function generateSimpleToken(user: any): string {
  const payload = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    timestamp: Date.now(),
  }

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64")
  const signature = crypto
    .createHmac("sha256", process.env.JWT_SECRET || "your-secret-key")
    .update(base64Payload)
    .digest("hex")

  return `${base64Payload}.${signature}`
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Create mock user
    const user = {
      id: Date.now().toString(),
      email,
      fullName,
      avatar: "",
    }

    // Generate simple token
    const token = generateSimpleToken(user)

    const response = NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
