# Build Stage
FROM node:18-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application files
COPY . .

# Production Image
FROM node:18-alpine
WORKDIR /app

# Copy dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY --from=builder /app .

# Expose the application port
EXPOSE 3016

# Run the application
CMD ["npm", "start"]


# docker build . -t prashanthshivanna/sandopa:02042025
# docker run --name sandopa -e "REACT_APP_USER_URL=https://sandopa-be.jssish.com/api/v1" "REACT_APP_LOGGING_LEVEL=DEBUG" -p "3016:3016" prashanthshivanna/sandopa:02042025 
# docker push prashanthshivanna/sandopa:02042025
# docker run  -d --name sandopa -e="REACT_APP_USER_URL=https://sandopa-be.jssish.com/api/v1" -e "REACT_APP_LOGGING_LEVEL=DEBUG" -e "VIRTUAL_HOST=sandopa.jssish.com" -e "VIRTUAL_PORT=3016" -e "LETSENCRYPT_HOST=sandopa.jssish.com" -p 3016:3016 --restart unless-stopped prashanthshivanna/sandopa:02042025





