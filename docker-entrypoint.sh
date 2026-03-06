#!/bin/sh
set -e

# Generate Prisma client (already done at build, safe to run again)
npx prisma generate

# Apply schema: use migrations if present, otherwise db push (e.g. when prisma/migrations is not in image)
if [ -d "prisma/migrations" ] && [ -n "$(find prisma/migrations -maxdepth 2 -name 'migration.sql' 2>/dev/null)" ]; then
  npx prisma migrate deploy
else
  npx prisma db push
fi

# Run seed (skip failure so app still starts if DB is not ready or already seeded)
npm run prisma:seed || true

exec node dist/src/main.js
