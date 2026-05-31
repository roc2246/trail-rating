import express from "express";

import { getHealth } from "../controllers";

import authRoutes from "./auth-routes";
import mountainRoutes from "./mountain-routes";
import trailRoutes from "./trail-routes";
import userRoutes from "./user-routes";

const router = express.Router();

router.get("/health", getHealth);

router.use("/auth", authRoutes);

router.use("/mountains", mountainRoutes);

router.use("/trails", trailRoutes);

router.use("/users", userRoutes);

export default router;