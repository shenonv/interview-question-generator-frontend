import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Question, SessionHistory } from "./types"
import { apiClient } from "./api"

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
  token: string | null

  // Actions
  setJobRole: (role: string) => void
  startSession: (role?: string) => Promise<void>
  nextQuestion: () => void
  previousQuestion: () => void
  saveAnswer: (index: number, answer: string) => void
  completeSession: () => void
  resetSession: () => void
  loadUserData: () => Promise<void>
  loadQuestions: (role: string) => Promise<void>
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
      token: null,

      // Session actions
      setJobRole: (role: string) => set({ jobRole: role }),

      startSession: async (role?: string) => {
        const { jobRole, loadQuestions } = get()
        const selectedRole = role || jobRole
        console.log("🔄 Starting session with jobRole:", selectedRole)
        console.log("🔍 Role parameter:", role)
        console.log("🔍 Current jobRole from store:", jobRole)
        console.log("🔍 Selected role:", selectedRole)
        console.log("🔍 Selected role type:", typeof selectedRole)
        
        if (!selectedRole) {
          console.log("❌ No job role selected")
          return
        }

        set({
          jobRole: selectedRole,
          sessionStartTime: new Date(),
          currentQuestionIndex: 0,
          answers: new Array(5).fill(""), // Initialize with empty strings
        })

        // Load questions from backend
        console.log("🔄 Loading questions for role:", selectedRole)
        await loadQuestions(selectedRole)
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
        newAnswers[index] = answer || "" // Ensure we don't save undefined
        set({ answers: newAnswers })
      },

      completeSession: () => {
        const { jobRole, answers, questions, sessionStartTime } = get()
        if (!sessionStartTime) return

        const answeredQuestions = answers.filter((answer) => answer && answer.trim() !== "").length
        const completionRate = (answeredQuestions / questions.length) * 100

        const session: SessionHistory = {
          id: Date.now().toString(),
          jobRole,
          totalQuestions: questions.length,
          answeredQuestions,
          completionRate,
          date: new Date().toISOString(),
          duration: Date.now() - sessionStartTime.getTime(),
          answers: questions.map((q, i) => ({
            questionId: q.id,
            question: q.question,
            answer: answers[i] || "",
            difficulty: q.difficulty,
            category: q.category,
          })),
        }

        const { sessionHistory } = get()
        set({
          sessionHistory: [...sessionHistory, session],
          sessionStartTime: null,
        })

        // Save to database
        get().saveSessionToDatabase(session)
      },

      resetSession: () => {
        set({
          jobRole: "",
          questions: [],
          currentQuestionIndex: 0,
          answers: [],
          sessionStartTime: null,
        })
      },

      loadUserData: async () => {
        console.log("🔄 Loading user data...")
        set({ isLoading: true })

        try {
          const { token } = get()
          if (!token) {
            console.log("❌ No token found")
            set({ user: null })
            return
          }

          const response = await apiClient.auth.getProfile(token)
          console.log("Auth response data:", response)

          if (response.user) {
            console.log("✅ User authenticated:", response.user.email)
            set({ user: response.user })
          } else {
            console.log("❌ No user found")
            set({ user: null, token: null })
          }
        } catch (error) {
          console.error("❌ Load user error:", error)
          set({ user: null, token: null })
        } finally {
          set({ isLoading: false })
        }
      },

      loadQuestions: async (role: string) => {
        console.log("🔄 Loading questions for role:", role)
        console.log("🔍 Role type:", typeof role)
        console.log("🔍 Role value:", JSON.stringify(role))
        set({ isLoading: true })

        try {
          const response = await apiClient.jobRole.getQuestions(role)
          console.log("Questions response:", response)

          if (response.questions) {
            // Convert backend questions to frontend format
            const questions = response.questions.map((q: any, index: number) => ({
              id: index.toString(),
              question: q.question || q, // Handle both new format (q.question) and old format (q)
              context: `Interview question for ${role}`,
              difficulty: "Medium" as const,
              category: role,
              hints: q.hints || [],
              correctAnswer: q.correctAnswer || undefined,
            }))
            
            console.log("✅ Questions loaded:", questions.length)
            set({ 
              questions,
              answers: new Array(questions.length).fill("") // Initialize answers array with empty strings
            })
          } else {
            console.log("❌ No questions in response")
            set({ questions: [] })
          }
        } catch (error) {
          console.error("❌ Load questions error:", error)
          set({ questions: [] })
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
          const response = await apiClient.auth.login(email, password)
          console.log("Sign in response data:", response)

          if (response.accessToken) {
            console.log("✅ Sign in successful")
            set({ 
              user: response.user, 
              token: response.accessToken 
            })
            return { success: true }
          } else {
            console.log("❌ Sign in failed:", response.message)
            return { success: false, error: response.message || "Login failed" }
          }
        } catch (error) {
          console.error("❌ Sign in error:", error)
          return { success: false, error: "Network error" }
        } finally {
          set({ isLoading: false })
        }
      },

      signUp: async (email: string, password: string, fullName: string) => {
        console.log(" Signing up...")
        set({ isLoading: true })

        try {
          const response = await apiClient.auth.register(email, password, fullName)
          console.log("Sign up response data:", response)

          if (response.accessToken) {
            console.log(" Sign up successful")
            set({ 
              user: response.user, 
              token: response.accessToken 
            })
            return { success: true }
          } else {
            console.log(" Sign up failed:", response.message)
            return { success: false, error: response.message || "Registration failed" }
          }
        } catch (error) {
          console.error(" Sign up error:", error)
          return { success: false, error: "Network error" }
        } finally {
          set({ isLoading: false })
        }
      },

      signOut: async () => {
        console.log("Signing out...")
        set({ user: null, token: null, sessionHistory: [], customRoles: [] })
        console.log("Signed out")
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

      clearCustomRoles: () => set({ customRoles: [] }),
    }),
    {
      name: "interview-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        sessionHistory: state.sessionHistory,
        customRoles: state.customRoles,
      }),
    }
  )
)
