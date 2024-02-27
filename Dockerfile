# Stage 1: Build the frontend
FROM node:14 AS build-frontend
WORKDIR /app
COPY client/package*.json ./client/
RUN npm --prefix client install
COPY client/ ./client/
RUN npm --prefix client run build
RUN ls -la /app/client/build  # Add this line for debugging

# Stage 2: Build the backend and copy the frontend build
FROM node:14 AS build-backend
WORKDIR /app
COPY --from=build-frontend /app/client/build /app/public
COPY server/package*.json ./server/
RUN npm --prefix server install
COPY server/ ./server/
EXPOSE 3000
CMD ["npm", "--prefix", "server", "start"]
