import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserBookedHotels,
  getUserBookingHistory,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Routes for user management
router.put("/:id",  updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

// Routes for user bookings
router.get("/:id/bookedHotels", verifyUser, getUserBookedHotels);
router.get("/:id/bookingHistory", verifyUser, getUserBookingHistory);

export default router;
