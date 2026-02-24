import "dotenv/config";
console.log("DATABASE_URL Env Var:", process.env.DATABASE_URL ? "FOUND" : "MISSING");
console.log("Value starts with:", process.env.DATABASE_URL?.substring(0, 15));

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    try {
        await prisma.$connect();
        console.log("Prisma Connected Successfully!");
        const users = await prisma.user.findMany();
        console.log("Users found:", users.length);
    } catch (e) {
        console.error("Prisma Connection Failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
