"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResultSummary } from "@/components/result-summary"
import { ArrowLeft, RotateCcw, BarChart3, Home, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useInterviewStore } from "@/lib/store"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthGuard } from "@/components/auth-guard"

function ResultsContent() {
  const router = useRouter()
  const { jobRole, questions, answers, resetSession, user, isEvaluating } = useInterviewStore()

  useEffect(() => {
    // If coming directly from evaluation start, questions may already be present
    // Only redirect if we truly have no context
    if (!jobRole && questions.length === 0) {
      router.replace("/role-selection")
    }
  }, [jobRole, questions.length, router])

  const handleRetry = () => {
    resetSession()
    router.push("/interview")
  }

  const answeredQuestions = answers.filter((answer) => answer.trim() !== "").length
  const completionRate = (answeredQuestions / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div></div>
            {user && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="h-4 w-4" />
                {user.fullName}
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Interview Session Complete!</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Great job completing your {jobRole} interview practice session
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
              <CardDescription>Here's how you performed in this session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{questions.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Questions</div>
                </div>

                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{answeredQuestions}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Questions Answered</div>
                </div>

                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {completionRate.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Always show results on this page. Evaluation happens on /evaluation */}
          <ResultSummary questions={questions} answers={answers} jobRole={jobRole} />

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button onClick={handleRetry} size="lg">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry Session
            </Button>

            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Dashboard
              </Button>
            </Link>

            <Link href="/role-selection">
              <Button variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Try Different Role
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="ghost" size="lg">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <AuthGuard>
      <ResultsContent />
    </AuthGuard>
  )
}
