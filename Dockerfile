# syntax=docker/dockerfile:1
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build dist
RUN yarn build

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
