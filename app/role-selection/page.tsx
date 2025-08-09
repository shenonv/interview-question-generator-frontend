"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleSelector } from "@/components/role-selector"
import { ArrowLeft, ArrowRight, User, Lightbulb, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useInterviewStore } from "@/lib/store"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthGuard } from "@/components/auth-guard"

function RoleSelectionContent() {
  const [selectedRole, setSelectedRole] = useState("")
  const router = useRouter()
  const { setJobRole, startSession, user, customRoles } = useInterviewStore()

  const handleStartInterview = async () => {
    console.log("🔍 handleStartInterview called")
    console.log("🔍 selectedRole:", selectedRole)
    console.log("🔍 selectedRole type:", typeof selectedRole)
    console.log("🔍 selectedRole length:", selectedRole?.length)
    
    if (selectedRole) {
      console.log("🔄 Starting interview with role:", selectedRole)
      await startSession(selectedRole)
      router.push("/interview")
    } else {
      console.log("❌ No role selected")
    }
  }

  const isCustomRole = customRoles.includes(selectedRole)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/dashboard">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            {user && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="h-4 w-4" />
                {user.fullName}
              </div>
            )}
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Select Your Job Role</CardTitle>
              <CardDescription>
                Choose from popular roles or add your own custom role to get relevant interview questions tailored to
                your career path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <RoleSelector 
                selectedRole={selectedRole} 
                onRoleSelect={(role) => {
                  console.log("🔍 onRoleSelect called with:", role)
                  console.log("🔍 role type:", typeof role)
                  setSelectedRole(role)
                }} 
              />

              {/* Information about question types */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Popular Roles
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Role-specific technical questions</li>
                    <li>• Industry best practices</li>
                    <li>• Difficulty levels: Easy to Hard</li>
                    <li>• Detailed hints and guidance</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Custom Roles
                  </h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• General interview questions</li>
                    <li>• Behavioral and situational queries</li>
                    <li>• Adaptable to any industry</li>
                    <li>• Professional development focus</li>
                  </ul>
                </div>
              </div>

              {/* Custom role tip */}
              {isCustomRole && (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">💡 Custom Role Tip</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Since "{selectedRole}" is a custom role, you'll receive general interview questions that can be
                    adapted to your specific field. Think about how each question relates to your role's
                    responsibilities and requirements.
                  </p>
                </div>
              )}

              <Button onClick={handleStartInterview} disabled={!selectedRole} size="lg" className="w-full group">
                Start Interview Session
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Custom roles count */}
              {customRoles.length > 0 && (
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You have {customRoles.length} custom role{customRoles.length !== 1 ? "s" : ""} saved:{" "}
                    {customRoles.join(", ")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function RoleSelectionPage() {
  return (
    <AuthGuard>
      <RoleSelectionContent />
    </AuthGuard>
  )
}
