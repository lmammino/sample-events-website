"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          <span className="text-secondary-foreground">Event</span>Hub
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/events"
            className={`text-sm hover:text-primary transition-colors ${
              pathname === "/events" ? "font-medium text-primary" : "text-muted-foreground"
            }`}
          >
            Events
          </Link>
          {session ? (
            <>
              <Link
                href="/reservations"
                className={`text-sm hover:text-primary transition-colors ${
                  pathname === "/reservations" ? "font-medium text-primary" : "text-muted-foreground"
                }`}
              >
                My Reservations
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:text-primary hover:bg-primary/10"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/10">
                Sign In
              </Button>
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          {isLoading ? (
            <Button variant="ghost" size="sm" disabled>
              Loading...
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/10">
              <Link href={session ? "/reservations" : "/auth/login"}>{session ? "My Reservations" : "Sign In"}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
