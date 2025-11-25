# Step 1: Build the React app
FROM node:18 AS builder
WORKDIR /

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve the compiled files using a lightweight web server
FROM nginx:alpine
COPY --from=builder /build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Nginx automatically starts when the container runs
