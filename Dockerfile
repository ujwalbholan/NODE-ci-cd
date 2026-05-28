#not good practice
# FROM node:20-alpine

# WORKDIR /app

# COPY package.json pnpm-lock.yaml ./

# RUN corepack enable && pnpm install --prod --frozen-lockfile

# COPY . .

# EXPOSE 3000

# CMD ["pnpm", "start"]


#good practice

# ---- Base Builder Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm install --prod --frozen-lockfile

COPY . .

# ---- Production Runtime Stage ----
FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only necessary files
COPY --from=builder /app /app

# Change ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 3000

CMD ["pnpm", "start"]