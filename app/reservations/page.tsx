import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getUserReservations } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default async function ReservationsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/reservations")
  }

  const reservations = await getUserReservations(user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Reservations</h1>

      {reservations.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">You don't have any reservations yet</h2>
          <p className="text-muted-foreground mb-6">Browse our events and reserve your spot!</p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservations.map((reservation) => (
            <Card
              key={reservation.id}
              className="overflow-hidden border-2 border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-48 md:h-auto md:w-1/3">
                  <Image
                    src={reservation.event.image || "/placeholder.svg"}
                    alt={reservation.event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <h3 className="text-xl font-semibold mb-2">{reservation.event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <CalendarIcon className="mr-1 h-4 w-4 text-primary" />
                    <span>{formatDate(reservation.event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPinIcon className="mr-1 h-4 w-4 text-primary" />
                    <span>{reservation.event.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Reserved on {formatDate(reservation.createdAt.toString())}
                    </div>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                      <Link href={`/events/${reservation.event.id}`}>View Event</Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
