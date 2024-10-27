const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function loadSampleData() {
  // Delete all existing data
  await prisma.potholeImage.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.pothole.deleteMany({});

  // Define sample data for potholes, images, and reports
  const potholeData = [
    {
      latitude: 43.45,
      longitude: -80.5,
      severity: 4,
      description: "Large pothole on Main St",
    },
    {
      latitude: 43.46,
      longitude: -80.51,
      severity: 5,
      description: "Deep pothole on Second St",
    },
    {
      latitude: 43.47,
      longitude: -80.52,
      severity: 3,
      description: "Pothole causing traffic issues on Third St",
    },
  ];

  const potholeImages = [
    { s3Url: "http://example.com/image1a.jpg" },
    { s3Url: "http://example.com/image1b.jpg" },
    { s3Url: "http://example.com/image2a.jpg" },
    { s3Url: "http://example.com/image2b.jpg" },
    { s3Url: "http://example.com/image3a.jpg" },
    { s3Url: "http://example.com/image3b.jpg" },
  ];

  // Create potholes first
  const createdPotholes = await Promise.all(
    potholeData.map((pothole) =>
      prisma.pothole.create({
        data: {
          latitude: pothole.latitude,
          longitude: pothole.longitude,
          severity: pothole.severity,
          description: pothole.description,
        },
      })
    )
  );

  // Create pothole images, connecting them to their respective potholes
  const createdImages = await Promise.all(
    potholeImages.map((image, index) =>
      prisma.potholeImage.create({
        data: {
          s3Url: image.s3Url,
          pothole: {
            connect: { id: createdPotholes[Math.floor(index / 2)].id }, // Connect to the corresponding pothole
          },
        },
      })
    )
  );

  // Define different comments, statuses, and details for each report
  const reportData = [
    {
      location: `Location for ${createdPotholes[0].description}`,
      description: `Pothole report for ${createdPotholes[0].description}`,
      comments: "Urgent repair needed!",
      status: "In Progress",
      details: "Near the bus stop; heavy traffic area.",
    },
    {
      location: `Location for ${createdPotholes[1].description}`,
      description: `Pothole report for ${createdPotholes[1].description}`,
      comments: "Reported by multiple users.",
      status: "Open",
      details: "Hazardous for cyclists; marked with cones.",
    },
    {
      location: `Location for ${createdPotholes[2].description}`,
      description: `Pothole report for ${createdPotholes[2].description}`,
      comments: "Needs immediate attention.",
      status: "Resolved",
      details: "Previously reported, marked for repair.",
    },
  ];

  // Create reports associated with each pothole (one report per pothole)
  for (let i = 0; i < createdPotholes.length; i++) {
    await prisma.report.create({
      data: {
        location: reportData[i].location,
        description: reportData[i].description,
        comments: reportData[i].comments,
        status: reportData[i].status,
        details: reportData[i].details,
        potholes: {
          connect: { id: createdPotholes[i].id }, // Connect the report to the corresponding pothole
        },
      },
    });
  }

  console.log("Sample data loaded successfully!");
}

// Call the function to load the sample data
loadSampleData()
  .catch((e) => {
    console.error("Error loading sample data:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
