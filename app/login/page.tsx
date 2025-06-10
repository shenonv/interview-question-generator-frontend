"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Brain } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useInterviewStore } from "@/lib/store"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useInterviewStore()

  const redirectPath = searchParams.get("redirect") || "/role-selection"

  const [loginForm, setLoginForm] = useState({
    email: "admin@interview.app", // Pre-fill for testing
    password: "admin123", // Pre-fill for testing
  })

  useEffect(() => {
    if (redirectPath && redirectPath !== "/role-selection") {
      setMessage(`Please sign in to access ${redirectPath.replace("/", "").replace("-", " ")}`)
    }
  }, [redirectPath])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("🔄 Form submitted with:", {
      email: loginForm.email,
      password: loginForm.password,
    })

    try {
      const result = await signIn(loginForm.email, loginForm.password)

      if (result.success) {
        console.log("✅ Login successful, redirecting to:", redirectPath)
        router.push(redirectPath)
        router.refresh()
      } else {
        console.log("❌ Login failed:", result.error)
        setError(result.error || "Login failed")
      }
    } catch (err) {
      console.error("❌ Login exception:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Brain className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Sign in with admin credentials to access the interview system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert className="mt-4">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                <p>Use the pre-filled admin credentials to sign in</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
