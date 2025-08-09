"use client"
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) return <p>Loading...</p>

  return <h1>Welcome {session.user.email}, role: {session.user.role}</h1>
}