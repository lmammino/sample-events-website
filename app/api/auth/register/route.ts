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
  const { name, email, password } = await request.json()

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  // In a real app, you would hash the password and store in a database
  const newUser = {
    id: `user${users.length + 1}`,
    name,
    email,
    password, // Would be hashed in a real app
  }

  users.push(newUser)

  // Log the user in
  const { password: _, ...userWithoutPassword } = newUser
  const session = JSON.stringify(userWithoutPassword)

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return NextResponse.json(userWithoutPassword)
}
