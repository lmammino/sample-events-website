import Link from "next/link"
import { Button } from "@/components/ui/button"
import EventList from "@/components/event-list"
import { getEvents } from "@/lib/data"
import BookCoverImage from "@/components/images/nodejs-design-patterns.jpg"
import Image from 'next/image'

export default async function Home() {
  const events = await getEvents()

  // Get upcoming events (sorted by date)
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Discover Amazing Events</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Browse and book tickets for the best events in your area.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/events">Browse All Events</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <EventList events={upcomingEvents} />

        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>

      <div className="my-12 py-12 px-6 bg-primary-foreground rounded-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-full md:w-1/3 max-w-[250px] aspect-[3/4]">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-2 py-1 rounded-bl-md z-10">
                Includes Free Chapter
              </div>
              <a href="https://nodejsdesignpatterns.com" target="_blank" rel="noopener noreferrer">
              <Image
                src={BookCoverImage}
                alt="Node.js Design Patterns, 4th Edition"
                width={250}
                height={375}
                className="rounded-md shadow-lg"
              />
              </a>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">This website is a demo</h2>
              <p className="text-muted-foreground mb-6">
                This project is a real example from the book <strong>Node.js Design Patterns (4th Edition)</strong> by <a href="https://mario.fyi/" target="_blank" rel="noopener noreferrer">Mario Casciaro</a> and
                {' '}<a href="https://loige.co/" target="_blank" rel="noopener noreferrer">Luciano Mammino</a> — your guide to building scalable, reliable Node.js applications using proven patterns
                and real-world techniques.
              </p>
              <p className="mb-4">
                👉 Visit the <a href="https://nodejsdesignpatterns.com" target="_blank" rel="noopener noreferrer"><strong>official website</strong></a> to learn more and download a free chapter to get started:
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="https://nodejsdesignpatterns.com" target="_blank" rel="noopener noreferrer">
                  Get the FREE chapter
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
