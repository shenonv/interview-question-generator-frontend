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
      return NextResponse.json({ customRoles: [] }, { status: 200 })
    }

    const decoded = verifySimpleToken(token)

    if (!decoded || !decoded.id) {
      return NextResponse.json({ customRoles: [] }, { status: 200 })
    }

    // Mock custom roles for the authenticated user
    const mockCustomRoles = ["AI/ML Engineer", "Blockchain Developer"]

    return NextResponse.json({ customRoles: mockCustomRoles }, { status: 200 })
  } catch (error) {
    console.error("Get custom roles error:", error)
    return NextResponse.json({ customRoles: [], error: "Internal server error" }, { status: 500 })
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

    const { role } = await request.json()

    if (!role || typeof role !== "string" || role.trim().length < 2) {
      return NextResponse.json({ error: "Valid role name is required" }, { status: 400 })
    }

    // Mock role creation
    console.log("Custom role added for user:", decoded.id, role.trim())

    return NextResponse.json({
      message: "Custom role added successfully",
      role: role.trim(),
    })
  } catch (error) {
    console.error("Add custom role error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const decoded = verifySimpleToken(token)

    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid authentication" }, { status: 401 })
    }

    const { role, clearAll } = await request.json()

    if (clearAll) {
      console.log("All custom roles cleared for user:", decoded.id)
      return NextResponse.json({ message: "All custom roles cleared successfully" })
    }

    if (!role || typeof role !== "string") {
      return NextResponse.json({ error: "Valid role name is required" }, { status: 400 })
    }

    console.log("Custom role removed for user:", decoded.id, role)

    return NextResponse.json({
      message: "Custom role removed successfully",
      role: role,
    })
  } catch (error) {
    console.error("Remove custom role error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
