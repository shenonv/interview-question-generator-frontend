import crypto from "crypto"

export interface AuthUser {
  id: string
  email: string
  fullName: string
  avatar?: string
}

// Simple token generation without JWT
export function generateSimpleToken(user: any): string {
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

// Simple token verification without JWT
export function verifySimpleToken(token: string): AuthUser | null {
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

    return {
      id: payload.id,
      email: payload.email,
      fullName: payload.fullName,
      avatar: payload.avatar || "",
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export async function getUserFromToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = verifySimpleToken(token)
    if (!decoded) {
      return null
    }

    return decoded
  } catch (error) {
    console.error("Get user from token error:", error)
    return null
  }
}
