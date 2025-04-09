import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import LoginForm from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login - EventHub",
  description: "Login to your EventHub account",
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Enter your email and password to sign in to your account</p>
      </div>

      <LoginForm />

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="underline underline-offset-4 hover:text-primary">
          Sign up
        </Link>
      </div>
    </div>
  )
}
