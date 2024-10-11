import express from "express";
import { logUserActivity, getUserActivityStats } from "../controllers/UserActivity.js";

const router = express.Router();

// Ghi lại hoạt động người dùng
router.post("/log",  logUserActivity);

// Lấy thống kê hoạt động của người dùng
router.get("/:id/activityStats", getUserActivityStats);

export default router;
