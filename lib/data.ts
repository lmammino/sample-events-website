import { db } from "@/lib/db"
import type { Event, Reservation } from "@/lib/types"

export async function getEvents(): Promise<Event[]> {
  const events = await db.event.findMany({
    orderBy: {
      date: "asc",
    },
  })

  return events.map(formatEvent)
}

export async function getEventById(id: string): Promise<Event | null> {
  const event = await db.event.findUnique({
    where: {
      id,
    },
  })

  if (!event) return null

  return formatEvent(event)
}

export async function getUserReservations(userId: string): Promise<Reservation[]> {
  const reservations = await db.reservation.findMany({
    where: {
      userId,
    },
    include: {
      event: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return reservations.map((reservation) => ({
    ...reservation,
    event: formatEvent(reservation.event),
  }))
}

export async function hasUserReservedEvent(userId: string, eventId: string): Promise<boolean> {
  const reservation = await db.reservation.findFirst({
    where: {
      userId,
      eventId,
    },
  })

  return !!reservation
}

// Helper function to format dates and ensure consistent types
function formatEvent(event: any): Event {
  return {
    ...event,
    date: event.date.toISOString().split("T")[0], // Format as YYYY-MM-DD
    price: Number(event.price),
    totalCapacity: Number(event.totalCapacity),
    availableCapacity: Number(event.availableCapacity),
  }
}
