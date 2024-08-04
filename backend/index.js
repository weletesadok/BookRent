require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log(`Database connected to ${process.env.DATABASE_URL}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}




checkDatabaseConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to start the server due to database connection issues:",
      error
    );
  });



