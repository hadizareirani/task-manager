# Use the official Node.js runtime as base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port that your app runs on
EXPOSE 3000

# Define the command to run your application in development mode
CMD ["npm", "run", "start:dev"]