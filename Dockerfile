# Use the official Node.js image as a base
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y curl gnupg lsb-release

# Download and install MongoDB tools
RUN curl -O https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian10-x86_64-100.5.2.deb \
    && dpkg -i mongodb-database-tools-debian10-x86_64-100.5.2.deb \
    && rm mongodb-database-tools-debian10-x86_64-100.5.2.deb

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
