import { PotholeSeverity, PrismaClient, ReportStatus } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Clear all potholes from the database
async function clearPotholes() {
  await prisma.potholeImage.deleteMany();
  await prisma.report.deleteMany();
  await prisma.pothole.deleteMany();
}

// Create a random number of potholes with associated images and reports
async function createPotholes(count: number) {
  const severities = Object.values(PotholeSeverity);
  const statuses = Object.values(ReportStatus);

  for (let i = 0; i < count; i++) {
    await prisma.pothole.create({
      data: {
        latitude: parseFloat((faker.location.latitude()).toFixed(6)),
        longitude: parseFloat((faker.location.longitude()).toFixed(6)),
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: faker.lorem.sentence(),
        // Generate a random number of pothole images
        images: {
          create: Array.from({ length: Math.ceil(Math.random() * 3) }, () => ({
            s3Url: faker.internet.url(),
          })),
        },
        // Generate a random report
        report: {
          create: {
            location: faker.location.streetAddress(),
            description: faker.lorem.sentences(2),
            comments: faker.lorem.sentence(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            details: faker.lorem.paragraph(),
          },
        },
      },
    });
  }
}

async function main() {
  // Number of potholes to seed
  const potholeCount = 10

  // Clear potholes
  await clearPotholes();
  console.log('Potholes cleared.');

  // Seed Potholes
  await createPotholes(potholeCount);

  console.log(`Database has been seeded with ${potholeCount} potholes!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
