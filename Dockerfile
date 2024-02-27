FROM node:14 AS build-frontend
WORKDIR /app

COPY client/package*.json ./client/
RUN npm --prefix client install

# Check contents of the client directory
RUN ls -la ./client/

COPY client/ ./client/
RUN npm --prefix client run build || echo "Build potentially failed - inspect output above"

# Check if the build directory exists now
RUN ls -la ./client/build || echo "/app/client/build does not exist"


# Stage 2: Build the backend and copy the frontend build
# FROM node:14 AS build-backend
# WORKDIR /app
# COPY --from=build-frontend /app/client/build /app/public
# COPY server/package*.json ./server/
# RUN npm --prefix server install
# COPY server/ ./server/
# EXPOSE 3000
# CMD ["npm", "--prefix", "server", "start"]
