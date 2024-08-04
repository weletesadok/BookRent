const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log(`Database connected to ${process.env.DATABASE_URL}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
