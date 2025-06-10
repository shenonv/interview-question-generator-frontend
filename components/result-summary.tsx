import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Question } from "@/lib/types"

interface ResultSummaryProps {
  questions: Question[]
  answers: string[]
  jobRole: string
}

export function ResultSummary({ questions, answers, jobRole }: ResultSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Review</CardTitle>
        <CardDescription>Review your answers for the {jobRole} interview questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {index + 1}. {question.question}
                </h3>
                <Badge variant="outline" className="shrink-0">
                  {question.difficulty}
                </Badge>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Answer:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{answers[index] || "No answer provided"}</p>
              </div>

              {question.hints && question.hints.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Key Points to Consider:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    {question.hints.map((hint, hintIndex) => (
                      <li key={hintIndex} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
