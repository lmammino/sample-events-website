import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import RegisterForm from "@/components/register-form"

export const metadata: Metadata = {
  title: "Register - EventHub",
  description: "Create a new EventHub account",
}

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
      </div>

      <RegisterForm />

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
          Sign in
        </Link>
      </div>
    </div>
  )
}
