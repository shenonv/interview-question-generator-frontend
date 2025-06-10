"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QuestionCard } from "@/components/question-card"
import { ProgressBar } from "@/components/progress-bar"
import { ArrowLeft, ArrowRight, Home, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useInterviewStore } from "@/lib/store"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthGuard } from "@/components/auth-guard"

function InterviewContent() {
  const router = useRouter()
  const {
    currentQuestionIndex,
    questions,
    answers,
    jobRole,
    nextQuestion,
    previousQuestion,
    saveAnswer,
    completeSession,
    user,
  } = useInterviewStore()

  useEffect(() => {
    if (!jobRole) {
      router.push("/role-selection")
    }
  }, [jobRole, router])

  const handleAnswerSave = (answer: string) => {
    saveAnswer(currentQuestionIndex, answer)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion()
    } else {
      completeSession()
      router.push("/results")
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  if (!jobRole || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Loading interview session...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/role-selection">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Change Role
              </Button>
            </Link>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{jobRole} Interview</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <User className="h-4 w-4" />
                  {user.fullName}
                </div>
              )}
              <Link href="/dashboard">
                <Button variant="ghost">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <ProgressBar progress={progress} className="mb-8" />

          <QuestionCard
            question={currentQuestion}
            answer={answers[currentQuestionIndex] || ""}
            onAnswerChange={handleAnswerSave}
          />

          <div className="flex justify-between mt-8">
            <Button onClick={previousQuestion} disabled={currentQuestionIndex === 0} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InterviewPage() {
  return (
    <AuthGuard>
      <InterviewContent />
    </AuthGuard>
  )
}
