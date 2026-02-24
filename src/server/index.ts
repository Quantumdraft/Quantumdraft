import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Basic route to check if server is running
app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

// API route to get users
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// API route to create a user (for testing)
app.post("/api/users", async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// API route to handle contact form submissions
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        message,
      },
    });
    res.json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
