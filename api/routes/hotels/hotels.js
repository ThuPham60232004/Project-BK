import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  getAllHotels,
  getHotelsByType,
  updateCityForAllHotels,
  getHotelsByAdminId
} from "../../controllers/hotels/hotel.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/countByCity", countByCity); 
router.get("/countByType", countByType); 
router.get("/room/:id", getHotelRooms);
router.get("/find/:id", getHotel);
router.get("/all", getAllHotels);
router.get("/", getHotels); 
router.get("/getHotelsByType", getHotelsByType); 
router.get("/hotelAdmin/:idAdmin", getHotelsByAdminId);
router.put("/update-city", updateCityForAllHotels);

export default router;
