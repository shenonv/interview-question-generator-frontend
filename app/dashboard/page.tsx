"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardCharts } from "@/components/dashboard-charts"
import { Home, Plus } from "lucide-react"
import Link from "next/link"
import { useInterviewStore } from "@/lib/store"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardPage() {
  const { sessionHistory, user, isLoading, loadUserData } = useInterviewStore()

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  const totalSessions = sessionHistory.length
  const totalQuestions = sessionHistory.reduce((sum, session) => sum + session.totalQuestions, 0)
  const averageCompletion =
    sessionHistory.length > 0
      ? sessionHistory.reduce((sum, session) => sum + session.completionRate, 0) / sessionHistory.length
      : 0

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user ? `Welcome back, ${user.fullName || user.email}!` : "Your Dashboard"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your interview preparation progress and performance
              </p>
            </div>

            <div className="flex gap-2">
              <Link href="/role-selection">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Session
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalSessions}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Interview practice sessions completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Questions Practiced
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalQuestions}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total questions answered across all sessions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Average Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {averageCompletion.toFixed(0)}%
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Average session completion rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Your progress and performance trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardCharts sessionHistory={sessionHistory} />
            </CardContent>
          </Card>

          {sessionHistory.length === 0 && (
            <Card className="mt-8">
              <CardContent className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Plus className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No sessions yet</h3>
                  <p className="text-sm">Start your first interview practice session to see your progress here</p>
                </div>
                <Link href="/role-selection">
                  <Button>Start Your First Session</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
