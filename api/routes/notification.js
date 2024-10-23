import express from "express";
import {
  sendNotification,
  getNotificationById,
  getNotifications,
  markAsRead,
  deleteNotification,
  getAllNotifications,
  getNotificationByAdminId
} from "../controllers/notification.js";

const router = express.Router();
router.post("/", sendNotification);
router.get("/user/:userId", getNotifications);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);
router.get("/", getAllNotifications);
router.get("/:id", getNotificationById);
router.get("/hotelAdmin/:idAdmin", getNotificationByAdminId);

export default router;
