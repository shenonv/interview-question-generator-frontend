export interface Question {
  id: string
  question: string
  context: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  hints: string[]
  correctAnswer?: string
}

export interface SessionHistory {
  id: string
  jobRole: string
  totalQuestions: number
  answeredQuestions: number
  completionRate: number
  date: string
  duration: number
  answers?: Array<{
    questionId: string
    question: string
    answer: string
    difficulty: string
    category: string
  }>
}

export interface AuthUser {
  id: string
  email: string
  fullName: string
  avatar?: string
}
