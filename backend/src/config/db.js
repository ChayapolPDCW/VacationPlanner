import "./env.js";
import { PrismaClient } from "../generated/prisma-client/index.js";

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("Successfully connected to the database on port", process.env.DATABASE_PORT);
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });

export default prisma;
