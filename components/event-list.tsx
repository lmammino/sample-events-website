import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Event, Reservation } from "@/lib/types"

export default function EventList({ events, reservedEvents }: { events: Event[], reservedEvents?: Reservation[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow border-2 border-transparent hover:border-primary/10">
            <div className="relative h-48 w-full">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              {reservedEvents?.some((reservation) => reservation.eventId === event.id) && (<Badge className="absolute top-2 right-2 bg-green-500 text-white">Booked</Badge>)}
              {event.price === 0 && <Badge className="absolute top-2 right-2 bg-primary text-white">Free</Badge>}
              {event.availableCapacity === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-3 py-1.5">
                    Sold Out
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold line-clamp-1">{event.title}</h3>
                {event.availableCapacity > 0 && (
                  <Badge variant="default" className="bg-primary">
                    {event.availableCapacity} spots left
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPinIcon className="mr-1 h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
