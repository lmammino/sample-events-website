import { hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const futureYear = new Date().getFullYear() + 1

async function main() {
  try {
    console.log("Starting database seeding...")

    // Create demo user
    console.log("Creating demo user...")
    const hashedPassword = await hash("password123", 10)

    const user = await prisma.user.upsert({
      where: { email: "demo@example.com" },
      update: {},
      create: {
        name: "Demo User",
        email: "demo@example.com",
        password: hashedPassword,
      },
    })

    console.log(`Created user: ${user.name} (${user.email})`)

    // Create events
    console.log("Creating events...")
    const events = [
      {
        title: "Tech Conference 2023",
        description: "Join us for the biggest tech conference of the year with industry leaders and innovators.",
        longDescription:
          "This two-day event will feature keynote speeches, workshops, and networking opportunities with the brightest minds in technology. Learn about the latest trends, innovations, and best practices that are shaping the future of the industry. Whether you're a developer, designer, product manager, or tech enthusiast, there's something for everyone at this premier event.",
        image: "/images/tech-conference.jpg",
        date: new Date(`${futureYear}-11-15`),
        time: "9:00 AM - 6:00 PM",
        location: "Convention Center, Downtown",
        price: 299,
        totalCapacity: 500,
        availableCapacity: 125,
      },
      {
        title: "Summer Music Festival",
        description: "A weekend of amazing music performances across multiple stages with your favorite artists.",
        longDescription:
          "Get ready for an unforgettable weekend of music, art, and community. With over 50 artists performing across 5 stages, this festival brings together diverse musical genres and talents. Enjoy food from local vendors, interactive art installations, and camping under the stars.",
        image: "/images/music-festival.jpg",
        date: new Date(`${futureYear}-08-25`),
        time: "12:00 PM - 11:00 PM",
        location: "Riverside Park",
        price: 150,
        totalCapacity: 2000,
        availableCapacity: 750,
      },
      {
        title: "Italian Cooking Workshop",
        description: "Learn to cook authentic Italian dishes with our expert chef in this hands-on workshop.",
        longDescription:
          "Join Chef Mario for a culinary journey through Italy. In this intimate workshop, you'll learn traditional techniques and recipes passed down through generations. All ingredients and equipment are provided, and you'll enjoy the meal you prepare at the end of the class.",
        image: "/images/cooking-workshop.jpg",
        date: new Date(`${futureYear}-07-10`),
        time: "6:00 PM - 9:00 PM",
        location: "Culinary Institute",
        price: 85,
        totalCapacity: 20,
        availableCapacity: 8,
      },
      {
        title: "Mountain Yoga Retreat",
        description: "A weekend of yoga, meditation, and wellness activities in a peaceful mountain setting.",
        longDescription:
          "Escape the hustle and bustle of daily life with this rejuvenating retreat. Expert instructors will guide you through yoga sessions suitable for all levels, meditation practices, and wellness workshops. Accommodations and healthy meals are included in this all-inclusive experience.",
        image: "/images/yoga-retreat.jpg",
        date: new Date(`${futureYear}-10-20`),
        time: "All day",
        location: "Mountain View Resort",
        price: 350,
        totalCapacity: 30,
        availableCapacity: 12,
      },
      {
        title: "Marathon City Run",
        description: "Join thousands of runners in this annual city marathon through scenic routes.",
        longDescription:
          "Challenge yourself in this IAAF-certified marathon that takes you through the most beautiful parts of the city. With water stations every 2 miles, medical support, and cheering crowds, you'll have everything you need to reach the finish line. All participants receive a medal, t-shirt, and post-race refreshments.",
        image: "/images/marathon.jpg",
        date: new Date(`${futureYear}-09-30`),
        time: "7:00 AM - 2:00 PM",
        location: "City Center",
        price: 75,
        totalCapacity: 5000,
        availableCapacity: 1243,
      },
      {
        title: "Wine Tasting Tour",
        description: "Sample premium wines from local vineyards with expert guidance and food pairings.",
        longDescription:
          "Embark on a journey through the region's finest vineyards. You'll learn about the wine-making process, sample a variety of wines, and enjoy perfectly paired gourmet bites. Transportation between vineyards is provided, making this a safe and educational experience for wine enthusiasts of all levels.",
        image: "/images/wine-tasting.jpg",
        date: new Date(`${futureYear}-08-12`),
        time: "1:00 PM - 6:00 PM",
        location: "Wine Country",
        price: 120,
        totalCapacity: 25,
        availableCapacity: 0,
      },
      {
        title: "Children's Science Fair",
        description: "A fun-filled day of interactive science experiments and demonstrations for kids of all ages.",
        longDescription:
          "Spark curiosity and a love for science in children through hands-on experiments, interactive displays, and engaging presentations. From chemistry reactions to physics principles, robotics to natural sciences, this event makes learning fun and accessible for young minds.",
        image: "/images/science-fair.jpg",
        date: new Date(`${futureYear}-07-22`),
        time: "10:00 AM - 4:00 PM",
        location: "Science Museum",
        price: 10,
        totalCapacity: 400,
        availableCapacity: 215,
      },
      {
        title: "Stand-up Comedy Night",
        description: "Laugh until it hurts with performances from top comedians and rising stars.",
        longDescription:
          "Prepare for an evening of non-stop laughter as our lineup of professional comedians delivers their best material. From observational humor to storytelling, improv to one-liners, these performers know how to work a crowd and leave you in stitches.",
        image: "/images/comedy-night.jpg",
        date: new Date(`${futureYear}-08-05`),
        time: "8:00 PM - 11:00 PM",
        location: "Laugh Factory",
        price: 35,
        totalCapacity: 150,
        availableCapacity: 42,
      }
    ]

    for (const eventData of events) {
      const event = await prisma.event.create({
        data: eventData,
      })
      console.log(`Created event: ${event.title}`)
    }

    // Create a sample reservation
    console.log("Creating sample reservation...")
    const firstEvent = await prisma.event.findFirst()

    if (firstEvent) {
      const reservation = await prisma.reservation.create({
        data: {
          userId: user.id,
          eventId: firstEvent.id,
        },
      })

      // Update event capacity
      await prisma.event.update({
        where: {
          id: firstEvent.id,
        },
        data: {
          availableCapacity: firstEvent.availableCapacity - 1,
        },
      })

      console.log(`Created reservation for: ${firstEvent.title}`)
    }

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
