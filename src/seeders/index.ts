import { PrismaClient } from '@prisma/client';

import JSON_CAREERS from './data/careers.json';
import JSON_CAMPUS from './data/campus.json';
import JSON_INTENTIONS from './data/intentions.json';
import JSON_INTERESTS from './data/interests.json';
import JSON_MATCH_STATUS from './data/match-status.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.career.deleteMany();
  await prisma.career.createMany({
    data: Object.values(JSON_CAREERS).map((x) => ({
      career_id: x.id,
      name: x.name,
    })),
  });

  await prisma.campus.deleteMany();
  await prisma.campus.createMany({
    data: Object.values(JSON_CAMPUS).map((x) => ({
      campus_id: x.id,
      name: x.name,
    })),
  });

  await prisma.intention.deleteMany();
  await prisma.intention.createMany({
    data: Object.values(JSON_INTENTIONS).map((x) => ({
      intention_id: x.id,
      name: x.name,
    })),
  });

  await prisma.interests.deleteMany();
  await prisma.interests.createMany({
    data: Object.values(JSON_INTERESTS).map((x) => ({
      interest_id: x.id,
      name: x.name,
    })),
  });

  await prisma.matchStatus.deleteMany();
  await prisma.matchStatus.createMany({
    data: Object.values(JSON_MATCH_STATUS).map((x) => ({
      match_status_id: x.id,
      name: x.name,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
