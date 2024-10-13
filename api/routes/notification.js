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

// Gửi một thông báo mới
router.post("/", sendNotification);

// Lấy tất cả các thông báo của người dùng
router.get("/user/:userId", getNotifications);

// Đánh dấu một thông báo là đã đọc
router.put("/:id/read", markAsRead);

// Xóa một thông báo
router.delete("/:id", deleteNotification);

// Lấy tất cả các thông báo
router.get("/", getAllNotifications);

// Lấy một thông báo theo ID
router.get("/:id", getNotificationById);


router.get("/hotelAdmin/:idAdmin", getNotificationByAdminId);

export default router;
