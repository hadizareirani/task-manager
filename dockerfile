# Use Node LTS for NestJS dev
FROM node:22

# Set working directory
WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose NestJS default port
EXPOSE 3000

# Start in development mode with hot reload
CMD ["npm", "run", "start:dev"]