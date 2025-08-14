"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { EvaluationProgress } from "@/components/evaluation-progress"
import { useInterviewStore } from "@/lib/store"

function EvaluationContent() {
  const router = useRouter()
  const { isEvaluating, evaluationProgress, questions, jobRole } = useInterviewStore()

  // If evaluation finished, go to results
  useEffect(() => {
    if (!isEvaluating) {
      router.replace("/results")
    }
  }, [isEvaluating, router])

  // If there is no context at all, return to role selection
  useEffect(() => {
    if (!jobRole && questions.length === 0) {
      router.replace("/role-selection")
    }
  }, [jobRole, questions.length, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <EvaluationProgress
        isEvaluating={isEvaluating}
        progress={evaluationProgress}
        totalQuestions={questions.length}
        completedQuestions={Math.floor((evaluationProgress / 100) * (questions.length || 1))}
      />
    </div>
  )
}

export default function EvaluationPage() {
  return (
    <AuthGuard>
      <EvaluationContent />
    </AuthGuard>
  )
}


