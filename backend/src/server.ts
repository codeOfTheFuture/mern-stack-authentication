import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";

import userRoutes from "./routes/userRoutes";

connectDB();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(colors.cyan(`⚡️ [server]: Server is running at http://localhost:${PORT}`))
);
