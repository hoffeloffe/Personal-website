# Step 1: Build the app
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY website/package.json website/package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files into the container
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app /app

# Install only production dependencies
RUN npm install --production

# Expose the port that the app will run on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
