import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface EvaluationProgressProps {
  isEvaluating: boolean
  progress: number
  totalQuestions: number
  completedQuestions: number
}

export function EvaluationProgress({ 
  isEvaluating, 
  progress, 
  totalQuestions, 
  completedQuestions 
}: EvaluationProgressProps) {
  if (!isEvaluating) return null

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Evaluating Answers</h3>
            <p className="text-sm text-muted-foreground">
              Processing {completedQuestions} of {totalQuestions} answers
            </p>
          </div>
          
          <Progress value={progress} className="w-full" />
          
          <div className="text-center text-sm text-muted-foreground">
            This may take a few moments...
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 