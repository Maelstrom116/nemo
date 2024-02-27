# FROM node:14 AS build-frontend
# WORKDIR /app

# COPY client/package*.json ./client/
# RUN npm --prefix client install

# # Check contents of the client directory
# RUN ls -la ./client/

# COPY client/ ./client/
# RUN npm --prefix client run build || echo "Build potentially failed - inspect output above"

# # Check if the build directory exists now
# RUN ls -la ./client/dist || echo "/app/client/build does not exist"


# Stage 2: Build the backend and copy the frontend build
# FROM node:14 AS build-backend
# WORKDIR /app
# COPY --from=build-frontend /app/client/build /app/public
# COPY server/package*.json ./server/
# RUN npm --prefix server install
# COPY server/ ./server/
# EXPOSE 3000
# CMD ["npm", "--prefix", "server", "start"]

# Stage 1: Build the frontend
FROM node:14 AS build-frontend
WORKDIR /app

# Copy the frontend package.json and package-lock.json (if available)
COPY client/package*.json ./client/
RUN npm --prefix client install

# Copy the rest of the frontend source code and build it
COPY client/ ./client/
RUN npm --prefix client run build

# Stage 2: Build the backend
FROM node:14 AS build-backend
WORKDIR /app

# Copy the backend package.json and package-lock.json (if available)
COPY server/package*.json ./server/
RUN npm --prefix server install

# Copy the rest of the backend source code
COPY server/ ./server/

# Assuming your backend serves the static files from the frontend
# Copy the frontend build (dist) to the location your server expects to serve static files from
# Adjust the destination path according to your server setup
COPY --from=build-frontend /app/client/dist /app/server/public

# Build the backend if necessary
# If your backend doesn't need a build step, you can skip this command
# RUN npm --prefix server run build

# Your server's start command
CMD ["npm", "--prefix", "server", "start"]
