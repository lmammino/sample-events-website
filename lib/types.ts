export interface User {
  id: string
  name: string
  email: string
}

export interface Event {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  date: string
  time: string
  location: string
  price: number
  totalCapacity: number
  availableCapacity: number
  createdAt?: Date
  updatedAt?: Date
}

export interface Reservation {
  id: string
  userId: string
  eventId: string
  createdAt: Date
  updatedAt?: Date
  event: Event
}
