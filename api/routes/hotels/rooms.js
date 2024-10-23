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
router.post("/:hotelid", createRoom);
router.put("/:id",updateRoom);
router.delete("/:id/:hotelid", deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);
router.get("/hotel/:hotelId", getRoomsByHotelId);
router.get("/hotelAdmin/:idAdmin", getRoomsByAdminId);


export default router;
