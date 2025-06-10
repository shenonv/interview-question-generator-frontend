"use client"

import type React from "react"

import { useEffect } from "react"
import { useInterviewStore } from "@/lib/store"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { loadUserData } = useInterviewStore()

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  return <>{children}</>
}
