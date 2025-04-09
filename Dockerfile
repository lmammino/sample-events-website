# Stage 1: Build
FROM node:22-slim@sha256:1c18d9ab3af4585870b92e4dbc5cac5a0dc77dd13df1a5905cea89fc720eb05b AS builder

# Install pnpm
RUN npm install -g pnpm

# Install build tools for native modules
RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild native modules for the environment
RUN pnpm rebuild bcrypt

# Copy the rest of the application code, excluding node_modules
COPY . .

# Generate Prisma client
RUN pnpm dlx prisma generate

# Initialize the database
RUN pnpm dlx prisma migrate deploy
RUN pnpm dlx prisma db push
RUN node --experimental-strip-types prisma/seed.ts

# Build the application
RUN pnpm build

# Stage 2: Production
FROM node:22-slim@sha256:1c18d9ab3af4585870b92e4dbc5cac5a0dc77dd13df1a5905cea89fc720eb05b AS runner
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma/db.sqlite ./prisma/db.sqlite

# Generate NEXTAUTH_SECRET dynamically
RUN export NEXTAUTH_SECRET=$(openssl rand -base64 42) && echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" > .env

# Set environment variables with default values
ENV NEXTAUTH_URL=http://localhost:3000

# Expose the port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]