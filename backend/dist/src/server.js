import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.get("/", (req, res) => res.send("Server is ready"));
app.listen(PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map