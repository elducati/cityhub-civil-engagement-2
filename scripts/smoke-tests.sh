#!/bin/bash

# Smoke tests for Docker builds

echo "🐳 Running Docker smoke tests..."

# Check Docker daemon is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker daemon is not running"
  exit 1
fi

echo "✅ Docker daemon running"

# Check docker-compose file validity
if ! docker compose config > /dev/null 2>&1; then
  echo "❌ docker-compose.yml is invalid"
  exit 1
fi

echo "✅ docker-compose.yml is valid"

# Try to build backend image
echo "🔨 Building backend image..."
if docker build -t civic-platform-backend-test backend/; then
  echo "✅ Backend image built successfully"
  docker rmi civic-platform-backend-test
else
  echo "❌ Failed to build backend image"
  exit 1
fi

# Try to build frontend image
echo "🔨 Building frontend image..."
if docker build -t civic-platform-frontend-test frontend/; then
  echo "✅ Frontend image built successfully"
  docker rmi civic-platform-frontend-test
else
  echo "❌ Failed to build frontend image"
  exit 1
fi

echo "✅ All smoke tests passed!"
