import Image from "next/image"
import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon } from "lucide-react"
import { getEventById, hasUserReservedEvent } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import ReserveButton from "@/components/reserve-button"
import { getCurrentUser } from "@/lib/auth"

export default async function EventPage({ params }: { params: { id: string } }) {
  const eventId = (await params).id
  const event = await getEventById(eventId)
  const user = await getCurrentUser()

  if (!event) {
    notFound()
  }

  const hasReserved = user && (await hasUserReservedEvent(user.id, eventId))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[300px] md:h-[400px] w-full mb-6 rounded-lg overflow-hidden">
            {hasReserved && (<Badge className="absolute right-2 top-2 z-10 mb-4 bg-green-500 text-white">Booked</Badge>)}
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="z-0 object-cover" />
          </div>

          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-5 w-5 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-5 w-5 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <UsersIcon className="mr-2 h-5 w-5 text-primary" />
              <span>
                <span data-testid="available-capacity">{event.availableCapacity}</span> / <span data-testid="total-capacity">{event.totalCapacity}</span> spots available
              </span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">About this event</h2>
            <p>{event.description}</p>
            <p>{event.longDescription}</p>
          </div>
        </div>

        <div>
          <Card className="p-6 sticky top-6 border-2 border-primary/10">
            <h2 className="text-xl font-semibold mb-4">Reserve your spot</h2>
            <div className="mb-4">
              <Badge className={`mb-2 ${event.availableCapacity === 0 ? 'bg-red-500' : 'bg-primary'}`} variant={event.availableCapacity > 0 ? "default" : "destructive"}>
                {event.availableCapacity > 0 ? `${event.availableCapacity} spots left` : "Sold out"}
              </Badge>
              <p className="text-lg font-bold">{event.price === 0 ? "Free" : `$${event.price}`}</p>
            </div>

            <ReserveButton
              eventId={event.id}
              disabled={event.availableCapacity === 0 || hasReserved}
              hasReserved={hasReserved}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
