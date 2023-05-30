import express, { Express } from "express";
import dotenv from "dotenv";
import colors from "colors";

import { notFound, errorHandler } from "./middleware/errorMiddleware.ts";

import userRoutes from "./routes/userRoutes.ts";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Express = express();

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
	console.log(colors.cyan(`⚡️ [server]: Server is running at http://localhost:${PORT}`))
);
