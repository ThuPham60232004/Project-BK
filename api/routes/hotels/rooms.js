import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
  updateRoomStatus,
  searchRooms,
  getRoomsByHotelId,
  getRoomsByAdminId
} from "../../controllers/hotels/room.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", createRoom);

// UPDATE
router.put("/availability", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
router.put("/status", updateRoomStatus);

// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// GET
router.get("/:id", getRoom);

// GET ALL
router.get("/", getRooms);

// Tìm kiếm phòng theo nhiều tiêu chí
router.get("/search", searchRooms);  

// GET ROOMS BY HOTEL ID
router.get("/hotel/:hotelId", getRoomsByHotelId);

router.get("/hotelAdmin/:idAdmin", getRoomsByAdminId);


export default router;
