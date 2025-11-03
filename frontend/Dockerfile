# Stage 1: Build static site (using Node just for flexibility)
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN mkdir build && cp index.html build/index.html

# Stage 2: Serve via Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
