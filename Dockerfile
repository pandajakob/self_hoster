# Use official Node.js image
FROM node:20-slim

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for better caching
COPY package*.json ./
COPY ./backend/package*.json ./backend/
COPY ./frontend/package*.json ./frontend/

# Install dependencies
RUN cd backend && npm install
RUN cd frontend && npm install
# Copy the rest of the project files
COPY . .







# Expose the port your app runs on (optional)
ENV port=3000

EXPOSE 3000

# Start the application
CMD ["npm", "start"]

