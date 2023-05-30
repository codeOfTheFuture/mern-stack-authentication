import express, { Router } from "express";
import { authUser } from "../controllers/userController.ts";

const router: Router = express.Router();

router.post("/auth", authUser);

export default router;
