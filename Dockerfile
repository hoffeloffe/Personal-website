# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY app/package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files including the resume file
COPY app/ ./

# Build the React app
RUN npm run build

# Stage 2: Create the production image
FROM debian:bookworm-slim

# Install nginx and clean up apt cache to reduce image size
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# Create directory for the app
RUN mkdir -p /usr/share/nginx/html

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/sites-available/default

# Expose port 3000
EXPOSE 3000

# Start nginx with simple configuration
CMD ["nginx", "-g", "daemon off;"]