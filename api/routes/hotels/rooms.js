import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  getRoomsByHotelId,
  getRoomsByAdminId
} from "../../controllers/hotels/room.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", createRoom);

// UPDATE
router.put("/:id",updateRoom);

// DELETE
router.delete("/:id/:hotelid", deleteRoom);

// GET
router.get("/:id", getRoom);

// GET ALL
router.get("/", getRooms);

// GET ROOMS BY HOTEL ID
router.get("/hotel/:hotelId", getRoomsByHotelId);

router.get("/hotelAdmin/:idAdmin", getRoomsByAdminId);


export default router;
