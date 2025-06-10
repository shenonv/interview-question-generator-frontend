"use client"

import type React from "react"
import { useEffect } from "react"
import { useInterviewStore } from "@/lib/store"
import { UserNav } from "./user-nav"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loadUserData } = useInterviewStore()

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  return (
    <>
      {user && (
        <div className="absolute top-4 left-4 z-50">
          <UserNav user={user} />
        </div>
      )}
      {children}
    </>
  )
}
