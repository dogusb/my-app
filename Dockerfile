# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodeapp && \
    adduser -S nodeapp -u 1001

# Copy application files
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Set ownership
RUN chown -R nodeapp:nodeapp /app

# Switch to non-root user
USER nodeapp

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "src/server.js"]