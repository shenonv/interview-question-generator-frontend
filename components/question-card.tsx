"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { Question } from "@/lib/types"

interface QuestionCardProps {
  question: Question
  answer: string
  onAnswerChange: (answer: string) => void
}

export function QuestionCard({ question, answer, onAnswerChange }: QuestionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{question.question}</CardTitle>
            <CardDescription className="text-base">{question.context}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {question.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="answer" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Your Answer
            </label>
            <Textarea
              id="answer"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          {question.hints && question.hints.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Hints to consider:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                {question.hints.map((hint, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
