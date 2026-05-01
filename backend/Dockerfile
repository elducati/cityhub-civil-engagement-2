# --- Stage 1: Base Image ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Stage 2: Development Image ---
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start:dev"]

# --- Stage 3: Build Image ---
FROM base AS build
COPY . .
RUN npm run build

# --- Stage 4: Production Image ---
FROM node:20-alpine AS production
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
USER appuser
EXPOSE 3001
CMD ["node", "dist/main.js"]