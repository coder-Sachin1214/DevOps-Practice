import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config({
    path: path.resolve(__dirname, "../../.env")
});
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
    });
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
