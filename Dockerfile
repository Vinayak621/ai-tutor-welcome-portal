FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better Docker layer caching)
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
