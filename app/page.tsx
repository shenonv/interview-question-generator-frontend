import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowRight, Sparkles, User, Lock, BarChart3, Target, Users } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Brain className="h-20 w-20 text-blue-600 dark:text-blue-400" />
              <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AI-Powered Interview
            <span className="text-blue-600 dark:text-blue-400"> Question Generator</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Prepare for your dream job with personalized interview questions tailored to your role. Practice, improve,
            and track your progress with our intelligent system.
          </p>

          <Card className="max-w-md mx-auto mb-8 border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                Sign In Required
              </CardTitle>
              <CardDescription>
                Create an account or sign in to access personalized interview practice sessions and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/login">
                <Button size="lg" className="w-full group">
                  <User className="mr-2 h-4 w-4" />
                  Sign In to Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                New here?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                  Create a free account
                </Link>
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Personalized Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Get questions tailored to your specific job role and experience level with AI-powered customization
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Track Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor your improvement with detailed analytics, performance charts, and session history
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Secure & Private
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Your data is secure with encrypted storage and personalized learning paths just for you
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 p-8 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Sign Up?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Save Your Progress:</strong> Never lose your interview practice sessions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Performance Analytics:</strong> Track improvement over time with detailed charts
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Multiple Job Roles:</strong> Practice for different positions and career paths
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Personalized Experience:</strong> Questions adapted to your skill level
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Session History:</strong> Review past answers and learn from mistakes
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Free to Use:</strong> Complete access to all features at no cost
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
