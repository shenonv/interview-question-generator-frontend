import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
