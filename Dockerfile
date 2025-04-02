# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

# Copy package files first
COPY app/package.json app/yarn.lock ./

# Install all dependencies (including devDependencies)
RUN yarn install --frozen-lockfile --registry=https://registry.npmmirror.com --production=false

# Verify Font Awesome is properly installed
RUN ls node_modules/@fortawesome && \
    yarn list @fortawesome

# Copy the rest of the app
COPY app ./

# Build the app
RUN yarn build

# Stage 2: Serve
FROM node:18
WORKDIR /app

# Install only production dependencies
COPY app/package.json app/yarn.lock ./
RUN yarn install --frozen-lockfile --registry=https://registry.npmmirror.com --production=true

# Install http-server
RUN yarn global add http-server --registry=https://registry.npmmirror.com

# Copy built files from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000"]