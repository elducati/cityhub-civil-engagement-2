# --- Stage 1: Base Image ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Stage 2: Development Image (For local testing) ---
FROM base AS development
ENV NODE_ENV=development
EXPOSE 3000
VOLUME /app

COPY . .
CMD ["npm", "run", "dev"]

# --- Stage 3: Production Image (Static Assets) ---
FROM node:20-alpine AS production
WORKDIR /app
# Install necessary tools for serving static files if needed, otherwise use a minimal base
RUN apk add --no-cache nginx
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules

# Expose port for Nginx (if serving static files directly) or Next.js server
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Step 4: Docker Compose File (Re-creation for completeness)

I will ensure the `docker-compose.yml` is present and correct, as it ties everything together.

```tool
TOOL_NAME: edit_existing_file
BEGIN_ARG: filepath
"docker-compose.yml"