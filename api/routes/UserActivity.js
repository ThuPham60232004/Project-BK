import express from "express";
import { logUserActivity, getUserActivityStats,getAllUserActivityStats } from "../controllers/UserActivity.js";

const router = express.Router();

// Ghi lại hoạt động người dùng
router.post("/log",  logUserActivity);

// Lấy thống kê hoạt động của người dùng
router.get("/:id/activityStats", getUserActivityStats);


router.get("/getAllUserActivityStats", getAllUserActivityStats);
export default router;
