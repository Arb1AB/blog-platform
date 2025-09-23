# ---------- Build Stage ----------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files first (better cache)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code (from build context = ./blog-platform-frontend)
COPY . ./

# Build app
RUN npm run build

# ---------- Production Stage ----------
FROM node:18-alpine

WORKDIR /app

# Install 'serve' only
RUN npm install -g serve

# Copy production build from build stage
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
