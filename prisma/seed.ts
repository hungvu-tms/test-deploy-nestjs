import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env['DATABASE_URL'];
if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing');
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const adapter = new PrismaMariaDb(databaseUrl);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  await prisma.post.createMany({
    data: [
      {
        title: 'Hello Prisma',
        description: 'First seeded post for local development.',
      },
      {
        title: 'NestJS + Prisma',
        description: 'Simple CRUD-ready post example.',
      },
      {
        title: 'Database Seeding',
        description: 'Seed scripts help you start fast.',
      },
      {
        title: 'Optional Description',
        description: null,
      },
      {
        title: 'Last Seeded Post',
        description: 'Fifth record in the Post table.',
      },
    ],
  });
}

main()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
