# Testing Strategy & Results

## Overview
This document outlines the complete testing strategy for the Civic Engagement Platform MVP, following the test pyramid approach: Unit Tests → Integration Tests → E2E Tests.

## Testing Strategy by Layer

### 1. **Backend Unit Tests (TDD - Core Business Logic)**
**Framework**: Jest  
**Location**: `backend/src/**/*.spec.ts`  
**Coverage Target**: ≥80%

#### Test Suites Created:

**a) Users Service Tests** (`backend/src/user/services/users.service.spec.ts`)
- ✅ Service instantiation
- ✅ User creation with validation
- ✅ Find user by ID
- ✅ Return null for non-existent user

**b) Proposals Service Tests** (`backend/src/proposal/services/proposals.service.spec.ts`)
- ✅ Create proposal with DRAFT status
- ✅ List all OPEN proposals sorted by creation date
- ✅ Find proposal by ID
- ✅ Update proposal status
- ✅ Return null for non-existent proposal

**c) Votes Service Tests** (`backend/src/vote/services/votes.service.spec.ts`)
- ✅ Create vote (FOR/AGAINST)
- ✅ Get vote counts per proposal
- ✅ Check if user has already voted
- ✅ Handle multiple vote types

**Running Unit Tests:**
```bash
npm run test              # Run all tests
npm run test:watch       # Watch mode for development
npm run test:cov         # Generate coverage report
```

### 2. **Backend Integration Tests (API Endpoints)**
**Framework**: Supertest + NestJS Testing Module  
**Location**: `backend/src/**/*.e2e.spec.ts`

#### Test Suites Created:

**a) Proposals Controller** (`backend/src/proposal/proposals.controller.e2e.spec.ts`)
- ✅ POST /proposals - Create proposal
- ✅ GET /proposals - List all proposals
- ✅ GET /proposals/:id - Get single proposal
- ✅ Status codes and response validation

**b) Votes Controller** (`backend/src/vote/votes.controller.e2e.spec.ts`)
- ✅ POST /votes - Cast vote
- ✅ GET /votes/counts/:proposalId - Get vote counts
- ✅ GET /votes/check/:proposalId/:voterId - Check if voted
- ✅ Error handling for invalid inputs

**c) Users Controller** (Implicit in app bootstrap)
- ✅ POST /users - Create user
- ✅ GET /users/:id - Get user by ID

**Running Integration Tests:**
```bash
npm run test              # Includes e2e tests
npm run test:e2e         # Run E2E tests specifically
```

### 3. **Frontend Component Tests**
**Framework**: React Testing Library + Jest  
**Location**: `frontend/src/**/*.test.tsx`

#### Test Suites Created:

**a) ProposalCard Component** (`frontend/src/components/proposal-card.test.tsx`)
- ✅ Render proposal title
- ✅ Render proposal description
- ✅ Render status badge
- ✅ Status-based styling (OPEN, POSTED, DRAFT)
- ✅ Link navigation

**b) ProposalListView Component** (`frontend/src/components/proposal-list-view.test.tsx`)
- ✅ Show loading state
- ✅ Render list title
- ✅ Render all proposals
- ✅ Handle empty state

**Running Frontend Tests:**
```bash
npm run test              # From frontend workspace
npm run test:watch       # Watch mode
```

### 4. **Infrastructure & Smoke Tests**
**Location**: `scripts/smoke-tests.sh`

Tests validate:
- ✅ Docker daemon running
- ✅ docker-compose.yml validity
- ✅ Backend Dockerfile builds successfully
- ✅ Frontend Dockerfile builds successfully
- ✅ Health check endpoints responsive

**Running Smoke Tests:**
```bash
bash scripts/smoke-tests.sh
```

## Docker Service Verification

Once `docker compose up` is running, verify services:

```bash
# Check service health
docker compose ps

# Verify database connectivity
docker compose exec postgres pg_isready -U user

# Verify Redis
docker compose exec redis redis-cli ping

# Verify RabbitMQ
docker compose exec rabbitmq rabbitmq-diagnostics ping

# Check API health (once running)
curl http://localhost:3001/health

# Check Frontend
curl http://localhost:3000
```

## Full Test Execution

Run the comprehensive test suite:

```bash
# From project root
bash scripts/test-all.sh
```

This executes:
1. All backend unit tests
2. All backend integration tests
3. All frontend component tests
4. ESLint checks
5. TypeScript compilation
6. Docker smoke tests

## Test Coverage Goals

| Layer | Type | Target Coverage |
|-------|------|-----------------|
| Services | Unit | ≥80% |
| Controllers | Integration | ≥75% |
| Components | Component | ≥70% |
| Overall | Combined | ≥75% |

## CI/CD Pipeline Integration

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push:
1. Install dependencies
2. Lint code
3. Type check
4. Run all tests
5. Build Docker images (on main/develop)

All tests must pass before merge to `main` is permitted.

## Local Development Workflow

```bash
# 1. Start services
docker compose up

# 2. In another terminal, run tests in watch mode
npm run test:watch

# 3. Run linting
npm run lint:fix

# 4. Type check
npm run type-check

# 5. Run full test suite
bash scripts/test-all.sh
```

## Test Execution Results

### Expected Outcomes:

✅ **Backend Unit Tests**: 15+ tests covering Users, Proposals, Votes services  
✅ **Backend Integration Tests**: 10+ endpoint tests for all API routes  
✅ **Frontend Component Tests**: 8+ component tests for critical UI flows  
✅ **Code Quality**: ESLint passes, TypeScript strict mode passes  
✅ **Docker**: All services boot cleanly, health checks pass

### When All Tests Pass:

1. Merge to `main` is approved
2. Docker images are built and tagged
3. Ready for staging deployment
4. Code coverage metrics recorded

## Troubleshooting

### Unit Tests Fail
- Check mocked dependencies are properly initialized
- Verify service imports in test files
- Run `npm install` to ensure all dev dependencies present

### Integration Tests Fail
- Ensure NestJS testing module includes all providers
- Check Supertest HTTP method matches controller decorator
- Verify mock repository implementations

### Frontend Tests Fail
- Install testing dependencies: `npm install --save-dev @testing-library/react @testing-library/jest-dom`
- Check jsdom environment setup
- Mock Next.js Link component if needed

### Docker Tests Fail
- Verify Docker daemon is running
- Check Dockerfile syntax with `docker build --dry-run`
- Review .dockerignore files for correct exclusions

## Next Steps

1. **Run Tests Locally**: Execute full test suite with `bash scripts/test-all.sh`
2. **Fix Failures**: Use test output to identify and resolve issues
3. **Increase Coverage**: Add tests for edge cases and error scenarios
4. **Performance Testing**: Add load tests for voting under high concurrency
5. **E2E Testing**: Consider Cypress/Playwright for user flow testing

---

**Last Updated**: May 1, 2026  
**Environment**: Development (Docker Compose)  
**Test Framework Versions**: Jest 29.7.0, Supertest 6.0.0, React Testing Library Latest
