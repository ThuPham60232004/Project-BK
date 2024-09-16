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
  searchHotels,
  updateCityForAllHotels,
  getHotelsByAdminId
} from "../../controllers/hotels/hotel.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

// Tạo mới khách sạn (CREATE)
router.post("/", verifyAdmin, createHotel); // Chỉ admin có quyền tạo mới khách sạn

// Cập nhật khách sạn (UPDATE)
router.put("/:id", updateHotel); // Cập nhật thông tin khách sạn theo ID

// Xóa khách sạn (DELETE)
router.delete("/:id", verifyAdmin, deleteHotel); // Xóa khách sạn theo ID, chỉ admin có quyền

// Lấy số lượng khách sạn theo thành phố và loại (GET count by city and type)
router.get("/countByCity", countByCity); // Lấy số lượng khách sạn theo thành phố
router.get("/countByType", countByType); // Lấy số lượng khách sạn theo loại

// Lấy phòng của khách sạn (GET hotel rooms)
router.get("/room/:id", getHotelRooms); // Lấy danh sách các phòng của khách sạn theo ID khách sạn

// Lấy thông tin khách sạn theo ID (GET hotel by id)
router.get("/find/:id", getHotel); // Lấy thông tin chi tiết của khách sạn theo ID

// Lấy tất cả các khách sạn (GET all hotels)
router.get("/all", getAllHotels); // Thêm route này để lấy tất cả khách sạn

// Lấy các khách sạn với các tham số truy vấn (GET hotels with query parameters)
router.get("/", getHotels); // Lấy danh sách các khách sạn với các tham số truy vấn

// Tìm kiếm khách sạn theo nhiều tiêu chí
router.get("/search", searchHotels); 
router.get("/hotelAdmin/:idAdmin", getHotelsByAdminId);

// Cập nhật thành phố cho tất cả khách sạn
router.put("/update-city", updateCityForAllHotels);

export default router;
