import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => res.send("Server is ready"));

app.listen(PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`));
