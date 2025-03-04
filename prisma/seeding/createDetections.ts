import { faker } from "@faker-js/faker";
import { DetectionSeverity, PrismaClient, ReportStatus } from "@prisma/client";

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
        latitude: parseFloat(
          (43.4723 + (Math.random() - 0.5) * 0.01).toFixed(6),
        ),
        longitude: parseFloat(
          (-80.5449 + (Math.random() - 0.5) * 0.01).toFixed(6),
        ),
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: faker.lorem.sentence(),
        s3Url: faker.internet.url(),
        report: {
          create: {
            description: faker.lorem.sentences(2),
            comments: faker.lorem.sentence(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            details: faker.lorem.paragraph(),
            geom:
              (43.4723 + (Math.random() - 0.5) * 0.01).toFixed(6) +
              "," +
              (-80.5449 + (Math.random() - 0.5) * 0.01).toFixed(6),
            geomJson: JSON.stringify({
              type: "Point",
              coordinates: [
                parseFloat(
                  (-80.5449 + (Math.random() - 0.5) * 0.01).toFixed(6),
                ),
                parseFloat((43.4723 + (Math.random() - 0.5) * 0.01).toFixed(6)),
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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
