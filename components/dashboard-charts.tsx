"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SessionHistory } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface DashboardChartsProps {
  sessionHistory: SessionHistory[]
}

export function DashboardCharts({ sessionHistory }: DashboardChartsProps) {
  if (sessionHistory.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No data available yet. Complete some interview sessions to see your progress!</p>
      </div>
    )
  }

  const chartData = sessionHistory.map((session, index) => ({
    session: `Session ${index + 1}`,
    completionRate: session.completionRate,
    totalQuestions: session.totalQuestions, 
    date: new Date(session.date).toLocaleDateString(),
  }))

  const roleData = sessionHistory.reduce(
    (acc, session) => {
      acc[session.jobRole] = (acc[session.jobRole] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const roleChartData = Object.entries(roleData).map(([role, count]) => ({
    role,
    sessions: count,
  }))

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completion Rate Trend</CardTitle>
            <CardDescription>Your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completionRate" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sessions by Role</CardTitle>
            <CardDescription>Practice distribution across job roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={roleChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Sessions</CardTitle>
          <CardDescription>Your latest interview practice sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessionHistory
              .slice(-5)
              .reverse()
              .map((session, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{session.jobRole}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{session.completionRate.toFixed(0)}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{session.totalQuestions} questions</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
