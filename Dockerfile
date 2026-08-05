# Multi-stage Dockerfile for LabX Enterprise Startup SaaS Deployment
FROM node:20-alpine

WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy all static assets & application files
COPY . .

EXPOSE 8080

CMD ["http-server", "-p", "8080", "--cors", "-c-1"]
