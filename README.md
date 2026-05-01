# Civic Engagement Platform

A modern, scalable civic engagement platform built with Next.js (frontend) and NestJS (backend).

## Getting Started

### Prerequisites

- Node.js 20.14.0 (use `.nvmrc`)
- Docker and Docker Compose

### Local Development

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd civic-platform
   ```

2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development environment:
   ```bash
   docker compose up
   ```

   This will start:
   - PostgreSQL database
   - Redis cache
   - RabbitMQ message queue
   - Backend API (http://localhost:3001)
   - Frontend app (http://localhost:3000)

5. Run tests:
   ```bash
   npm run test
   ```

## Project Structure

- `backend/` - NestJS API server
- `frontend/` - Next.js web application
- `docker-compose.yml` - Local development stack

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Run tests and linting
4. Submit a pull request to `develop`

## License

MIT