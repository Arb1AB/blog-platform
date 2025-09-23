# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY blog-platform-frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Copy all frontend files
COPY blog-platform-frontend/ ./

# Build the app
RUN npm run build

# Install serve to run production build
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
