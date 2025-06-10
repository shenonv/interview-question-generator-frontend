import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Simple token verification without JWT
function verifySimpleToken(token: string): any {
  try {
    const [base64Payload, signature] = token.split(".")

    if (!base64Payload || !signature) {
      return null
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.JWT_SECRET || "your-secret-key")
      .update(base64Payload)
      .digest("hex")

    if (signature !== expectedSignature) {
      return null
    }

    // Decode payload
    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString())

    // Check if token is expired (7 days)
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
    if (Date.now() - payload.timestamp > sevenDaysInMs) {
      return null
    }

    return payload
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ sessions: [] }, { status: 200 })
    }

    const decoded = verifySimpleToken(token)

    if (!decoded || !decoded.id) {
      return NextResponse.json({ sessions: [] }, { status: 200 })
    }

    // Mock sessions for the authenticated user
    const mockSessions = [
      {
        id: "1",
        jobRole: "Frontend Developer",
        totalQuestions: 5,
        answeredQuestions: 4,
        completionRate: 80,
        date: new Date().toISOString(),
        duration: 1200000,
      },
      {
        id: "2",
        jobRole: "Backend Developer",
        totalQuestions: 5,
        answeredQuestions: 5,
        completionRate: 100,
        date: new Date(Date.now() - 86400000).toISOString(),
        duration: 1500000,
      },
    ]

    return NextResponse.json({ sessions: mockSessions }, { status: 200 })
  } catch (error) {
    console.error("Get sessions error:", error)
    return NextResponse.json({ sessions: [], error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const decoded = verifySimpleToken(token)

    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid authentication" }, { status: 401 })
    }

    const sessionData = await request.json()

    // Mock session save
    console.log("Session saved for user:", decoded.id, sessionData)

    return NextResponse.json({
      message: "Session saved successfully",
      sessionId: Date.now().toString(),
    })
  } catch (error) {
    console.error("Save session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
