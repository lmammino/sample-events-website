import { getEvents } from "@/lib/data"
import EventList from "@/components/event-list"

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>
      <EventList events={events} />
    </div>
  )
}
