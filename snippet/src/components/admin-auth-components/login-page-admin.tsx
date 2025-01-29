"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { AuthForm } from "@/components/auth-form"
import { adminLogin } from "@/app/actions/auth"
import type React from "react"

const initialState = {
  error: null,
  success: false,
  admin: null,
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(adminLogin, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await formAction(new FormData(e.currentTarget))
    setIsSubmitting(false)
  }

  if (state.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="text-center">
          <h1 className="text-2xl font-medium">Welcome, Admin!</h1>
          <p className="mt-2 text-zinc-400">You have successfully logged in.</p>
          <p className="text-sm text-zinc-500">{state.admin.email}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23888' fill-opacity='.4'/%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px",
        }}
      />
      <div className="relative z-10">
        <AuthForm onSubmit={handleSubmit} errors={state.error} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}

