# --- Stage 1: Base Image ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Stage 2: Development Image ---
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- Stage 3: Build Image ---
FROM base AS build
COPY . .
RUN npm run build

# --- Stage 4: Production Image ---
FROM node:20-alpine AS production
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
USER appuser
EXPOSE 3000
CMD ["npm", "start"]