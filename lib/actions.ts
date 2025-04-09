"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function reserveEvent(eventId: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("You must be logged in to reserve an event")
  }

  // Check if event exists and has available capacity
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  })

  if (!event) {
    throw new Error("Event not found")
  }

  if (event.availableCapacity <= 0) {
    throw new Error("Event is sold out")
  }

  // Check if user already has a reservation for this event
  const existingReservation = await db.reservation.findFirst({
    where: {
      userId: user.id,
      eventId,
    },
  })

  if (existingReservation) {
    throw new Error("You already have a reservation for this event")
  }

  // Create reservation and update event capacity in a transaction
  await db.$transaction(async (tx) => {
    // Create reservation
    await tx.reservation.create({
      data: {
        userId: user.id,
        eventId,
      },
    })

    // Update event capacity
    await tx.event.update({
      where: {
        id: eventId,
      },
      data: {
        availableCapacity: event.availableCapacity - 1,
      },
    })
  })

  // Revalidate the event page to show updated capacity
  revalidatePath(`/events/${eventId}`)
  revalidatePath("/reservations")

  return { success: true }
}
