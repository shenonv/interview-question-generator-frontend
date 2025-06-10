import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Question, SessionHistory } from "./types"
import { getQuestionsForRole } from "./mock-data"

interface InterviewState {
  // Current session state
  jobRole: string
  questions: Question[]
  currentQuestionIndex: number
  answers: string[]
  sessionStartTime: Date | null

  // Session history
  sessionHistory: SessionHistory[]

  // Custom roles
  customRoles: string[]

  // User state
  user: any
  isLoading: boolean

  // Actions
  setJobRole: (role: string) => void
  startSession: () => void
  nextQuestion: () => void
  previousQuestion: () => void
  saveAnswer: (index: number, answer: string) => void
  completeSession: () => void
  resetSession: () => void
  loadUserData: () => Promise<void>
  saveSessionToDatabase: (session: SessionHistory) => Promise<void>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>

  // Custom roles actions
  addCustomRole: (role: string) => void
  removeCustomRole: (role: string) => void
  clearCustomRoles: () => void
}

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set, get) => ({
      // Initial state
      jobRole: "",
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      sessionStartTime: null,
      sessionHistory: [],
      customRoles: [],
      user: null,
      isLoading: false,

      // Actions
      setJobRole: (role: string) => {
        const questions = getQuestionsForRole(role)
        set({
          jobRole: role,
          questions,
          answers: new Array(questions.length).fill(""),
          currentQuestionIndex: 0,
        })
      },

      startSession: () => {
        set({ sessionStartTime: new Date() })
      },

      nextQuestion: () => {
        const { currentQuestionIndex, questions } = get()
        if (currentQuestionIndex < questions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 })
        }
      },

      previousQuestion: () => {
        const { currentQuestionIndex } = get()
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 })
        }
      },

      saveAnswer: (index: number, answer: string) => {
        const { answers } = get()
        const newAnswers = [...answers]
        newAnswers[index] = answer
        set({ answers: newAnswers })
      },

      completeSession: async () => {
        const { jobRole, questions, answers, sessionHistory, sessionStartTime, saveSessionToDatabase } = get()
        const answeredQuestions = answers.filter((answer) => answer.trim() !== "").length
        const completionRate = (answeredQuestions / questions.length) * 100

        const sessionAnswers = questions.map((question, index) => ({
          questionId: question.id,
          question: question.question,
          answer: answers[index] || "",
          difficulty: question.difficulty,
          category: question.category,
        }))

        const newSession: SessionHistory = {
          id: Date.now().toString(),
          jobRole,
          totalQuestions: questions.length,
          answeredQuestions,
          completionRate,
          date: new Date().toISOString(),
          duration: sessionStartTime ? Date.now() - sessionStartTime.getTime() : 0,
        }

        set({
          sessionHistory: [...sessionHistory, newSession],
        })

        // Save to database if user is authenticated
        await saveSessionToDatabase({
          ...newSession,
          answers: sessionAnswers,
        } as any)
      },

      resetSession: () => {
        const { jobRole } = get()
        const questions = getQuestionsForRole(jobRole)
        set({
          questions,
          currentQuestionIndex: 0,
          answers: new Array(questions.length).fill(""),
          sessionStartTime: new Date(),
        })
      },

      loadUserData: async () => {
        console.log("🔄 Loading user data...")
        set({ isLoading: true })

        try {
          const response = await fetch("/api/auth/me")
          console.log("Auth response status:", response.status)

          const data = await response.json()
          console.log("Auth response data:", data)

          if (data.user) {
            console.log("✅ User authenticated:", data.user.email)
            set({ user: data.user })
          } else {
            console.log("❌ No user found")
            set({ user: null })
          }
        } catch (error) {
          console.error("❌ Load user error:", error)
          set({ user: null })
        } finally {
          set({ isLoading: false })
        }
      },

      saveSessionToDatabase: async (session: any) => {
        // Mock implementation
        console.log("Session saved:", session.jobRole)
      },

      signIn: async (email: string, password: string) => {
        console.log("🔄 Signing in...")
        set({ isLoading: true })

        try {
          const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })

          console.log("Sign in response status:", response.status)

          const data = await response.json()
          console.log("Sign in response data:", data)

          if (response.ok && data.success) {
            console.log("✅ Sign in successful")
            set({ user: data.user })
            return { success: true }
          } else {
            console.log("❌ Sign in failed:", data.error)
            return { success: false, error: data.error || "Login failed" }
          }
        } catch (error) {
          console.error("❌ Sign in error:", error)
          return { success: false, error: "Network error" }
        } finally {
          set({ isLoading: false })
        }
      },

      signUp: async (email: string, password: string, fullName: string) => {
        // For now, just redirect to sign in
        return { success: false, error: "Please use admin credentials to sign in" }
      },

      signOut: async () => {
        console.log("🔄 Signing out...")
        try {
          await fetch("/api/auth/signout", { method: "POST" })
          set({ user: null, sessionHistory: [], customRoles: [] })
          console.log("✅ Signed out")
        } catch (error) {
          console.error("❌ Sign out error:", error)
        }
      },

      // Custom roles actions
      addCustomRole: (role: string) => {
        const { customRoles } = get()
        if (!customRoles.includes(role)) {
          const newCustomRoles = [...customRoles, role]
          set({ customRoles: newCustomRoles })
        }
      },

      removeCustomRole: (role: string) => {
        const { customRoles } = get()
        const newCustomRoles = customRoles.filter((r) => r !== role)
        set({ customRoles: newCustomRoles })
      },

      clearCustomRoles: () => {
        set({ customRoles: [] })
      },
    }),
    {
      name: "interview-storage",
      partialize: (state) => ({
        sessionHistory: state.sessionHistory,
        customRoles: state.customRoles,
      }),
    },
  ),
)
