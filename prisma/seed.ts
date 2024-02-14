import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (let i = 1; i <= 5; i++) {
    const birthDate = new Date(1980 + i, 0, i); // JavaScript months are 0-indexed
    const farmer = await prisma.farmer.create({
      data: {
        name: `Farmer ${i}`,
        idCardNumber: `00${i.toString().padStart(4, '0')}`,
        birthDate: birthDate,
      },
    });
    console.log(`Created farmer with id: ${farmer.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
