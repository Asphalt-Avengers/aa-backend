import { DetectionSeverity, PrismaClient, ReportStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Clear all detections from the database
async function clearDetections() {
  await prisma.detection.deleteMany();
  await prisma.report.deleteMany();
}

// Create a random number of detections with associated images and reports
async function createDetections(count: number) {
  const severities = Object.values(DetectionSeverity);
  const statuses = Object.values(ReportStatus);

  for (let i = 0; i < count; i++) {
    await prisma.detection.create({
      data: {
        latitude: parseFloat(faker.location.latitude().toFixed(6)),
        longitude: parseFloat(faker.location.longitude().toFixed(6)),
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: faker.lorem.sentence(),
        // Generate a random number of detection images
        s3Url: faker.internet.url(),
        // Generate a random report
        report: {
          create: {
            description: faker.lorem.sentences(2),
            comments: faker.lorem.sentence(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            details: faker.lorem.paragraph(),
            geom:
              faker.location.latitude().toString() +
              "," +
              faker.location.longitude().toString(),
            geomJson: JSON.stringify({
              type: "Point",
              coordinates: [
                parseFloat(faker.location.longitude().toString()),
                parseFloat(faker.location.latitude().toString()),
              ],
            }),
          },
        },
      },
    });
  }
}

async function main() {
  // Number of detections to seed
  const detectionCount = 10;

  // Clear detections
  await clearDetections();
  console.log("Detections cleared.");

  // Seed Detections
  await createDetections(detectionCount);

  console.log(`Database has been seeded with ${detectionCount} detections!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
