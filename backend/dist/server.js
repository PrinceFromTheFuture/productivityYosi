import { neon } from "@neondatabase/serverless";
import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import express from "express";
import { halfHourSesstionsTable, usersTable } from "./schema.js";
import dayjs from "dayjs";
import cors from "cors";
import bodyParser from "body-parser";
configDotenv();
const sql = neon(process.env.PRODUCTION_DB_CONNECTION_STRING);
export const db = drizzle(sql);
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.listen(3000, () => {
    console.log("server is live");
});
server.post("/newSession", async (req, res) => {
    const userId = req.body.userId;
    await db.insert(halfHourSesstionsTable).values({ date: dayjs().toDate(), userId: userId });
    res.json({ success: true });
});
server.get("/users", async (req, res) => {
    const users = await db.select().from(usersTable);
    res.json({ success: true, users: users });
});
server.get("/sessions", async (req, res) => {
    const sesstions = await db.select().from(halfHourSesstionsTable);
    res.json({ success: true, sesstions: sesstions });
});
