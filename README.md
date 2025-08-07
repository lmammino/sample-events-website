# EventHub: A sample Events Website

<a href="https://nodejsdesignpatterns.com" target="_blank" rel="noopener noreferrer">
  <img width="240" align="right" src="components/images/nodejs-design-patterns.jpg" alt="Node.js Design Patterns, 4th Edition" style="margin-left: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</a>

This website is a demo project from the book **[Node.js Design Patterns (4th
Edition)](https://nodejsdesignpatterns.com)** by [Mario Casciaro](https://mario.fyi/) and
[Luciano Mammino](https://loige.co/). The book is your guide to building
scalable, reliable Node.js applications using proven patterns and real-world
techniques.

👉 Visit the [official website](https://nodejsdesignpatterns.com) to learn more
and download a free chapter to get started.

---

This is a sample events website built with Next.js, Prisma, and SQLite. It
allows users to browse events, reserve spots, and manage their reservations.

## Running the Application

You can run this application either locally or using Docker.

### Running Locally

Follow these steps to run the application locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lmammino/sample-events-website.git
   cd sample-events-website
   ```

2. **Install dependencies**: Make sure you have `pnpm` installed. If not,
   install it globally:
   ```bash
   npm install -g pnpm
   ```
   Then, install the project dependencies:
   ```bash
   pnpm install
   ```

3. **Generate Prisma client**:
   ```bash
   pnpm dlx prisma generate
   ```

4. **Initialize the database**: Run the following commands to set up the
   database:
   ```bash
   pnpm dlx prisma migrate deploy
   pnpm dlx prisma db push
   node prisma/seed.ts
   ```

5. **Set up environment variables**: Create a `.env` file in the root of the
   project and add the following line:
   ```plaintext
   NEXTAUTH_URL=http://localhost:3000
   ```
   You can also set `NEXTAUTH_SECRET` to a random string for local development.
   You can generate a random secret using the following command:
   ```bash
   openssl rand -base64 42
   ```
   Alternatively, you can use the provided `.env.example` as a template.

6. **Start the development server**:
   ```bash
   pnpm dev
   ```
   The application will be available at
   [http://localhost:3000](http://localhost:3000).

### Running with Docker

To run the application using Docker, use the following command:

```bash
docker run -p 3000:3000 ghcr.io/lmammino/sample-events-website:main
```

This will pull the pre-built Docker image from GitHub Container Registry and
start the application. The application will be available at
[http://localhost:3000](http://localhost:3000).

## Features

- Browse upcoming events
- Reserve spots for events
- View and manage your reservations
- Authentication and user management

## Environment Variables

The application uses the following environment variables:

- `NEXTAUTH_URL`: The base URL of the application (default:
  `http://localhost:3000`)
- `NEXTAUTH_SECRET`: A secret key for NextAuth (generated dynamically in Docker
  or set manually for local development)

## Contributing

Feel free to open issues or submit pull requests to improve this project.
Contributions are welcome!

## License

This project is licensed under the MIT License.
