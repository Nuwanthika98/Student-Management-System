# Use an official Node.js runtime as a base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose necessary ports
EXPOSE 3000 8080 9090

# Set environment variables
ENV HTTP_PORT=${HTTP_PORT}
ENV HTTPS_PORT=${HTTPS_PORT}
ENV DATABASE_URI=${DATABASE_URI}
ENV SSL_PRIVATE_KEY_PATH=${SSL_PRIVATE_KEY_PATH}
ENV SSL_CERTIFICATE_KEY=${SSL_CERTIFICATE_KEY}

# Define the command to run the app
CMD ["npm", "run", "dev"]
