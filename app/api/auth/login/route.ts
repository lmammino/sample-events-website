import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock user database
const users = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
  },
]

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // In a real app, you would hash the password and check against the database
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  // Set a cookie to maintain the session
  // In a real app, you would use a proper session management system
  const { password: _, ...userWithoutPassword } = user
  const session = JSON.stringify(userWithoutPassword)

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return NextResponse.json(userWithoutPassword)
}
