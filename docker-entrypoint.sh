#!/bin/sh
set -e

# Use deploy (not dev): no shadow DB needed; dev requires CREATE DATABASE permission
npx prisma migrate deploy
# Generate Prisma client (already done at build, safe to run again)
npx prisma generate

# Run seed (skip failure so app still starts if DB is not ready or already seeded)
npm run prisma:seed || true

exec node dist/src/main.js
