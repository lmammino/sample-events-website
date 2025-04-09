"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { reserveEvent } from "@/lib/actions"

export default function ReserveButton({
  eventId,
  disabled = false,
}: {
  eventId: string
  disabled?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const handleReserve = async () => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/events/${eventId}`)
      return
    }

    setIsLoading(true)
    try {
      await reserveEvent(eventId)

      toast({
        title: "Success!",
        description: "Your spot has been reserved.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reserve your spot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleReserve}
      disabled={disabled || isLoading}
      className="w-full bg-primary hover:bg-primary/90"
      size="lg"
    >
      {isLoading ? "Processing..." : "Reserve your spot"}
    </Button>
  )
}
