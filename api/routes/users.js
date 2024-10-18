import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserBookedHotels,
  getUserBookingHistory,
  countUsers
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/countUsers", countUsers);
router.put("/:id",  updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

router.get("/:id/bookedHotels", verifyUser, getUserBookedHotels);
router.get("/:id/bookingHistory", verifyUser, getUserBookingHistory);

export default router;
