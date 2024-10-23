import express from "express";
import { logUserActivity, getUserActivityStats,getAllUserActivityStats } from "../controllers/UserActivity.js";

const router = express.Router();
router.post("/log",  logUserActivity);
router.get("/:id/activityStats", getUserActivityStats);
router.get("/getAllUserActivityStats", getAllUserActivityStats);
export default router;
