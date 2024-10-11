import express from "express";
import { getBookingDays,getBookingByAdminId,
    getMostBookedDay,createBooking,getBooking, updateBooking, 
    deleteBooking,getBookingsWithinDateRange, getUserBookings, getBookingHistory, 
    cancelBooking, getBookingCount, getTotalRevenue, getBookingCountByUser, 
    getBookingCountByHotel,getAllBookings,getRevenueByHotel, 
    getHotelsWithNoBookings ,getHotelsWithNoBookingsAllTime,getRevenueByHotelAllTime,
    getBookingCountByHotelAllTime,getTotalRevenueAllTime,getBookingCountByUserAllTime,
    getTotalBookings,getRevenueByAdmin} from "../../controllers/hotels/booking.js";

const router = express.Router();

// Tạo một booking mới
router.post("/", createBooking);

// Lấy một booking theo ID
router.get("/:id", getBooking);
// Cập nhật một booking
router.put("/:id", updateBooking);

// Xóa một booking
router.delete("/:id", deleteBooking);

// Lấy tất cả các bookings của một người dùng
router.get("/user/:userId", getUserBookings);
router.get("/", getAllBookings);

// Lấy lịch sử đặt phòng của người dùng
router.get("/user/:userId/history", getBookingHistory);

// Hủy phòng của người dùng
router.put("/:id/cancel", cancelBooking);

// Thống kê số lượng booking 
router.get("/statistics/booking-count", getBookingCount);

// Tổng doanh thu từ các booking 
router.get("/statistics/total-revenue", getTotalRevenue);

// Thống kê số lượng theo người dùng 
router.get("/statistics/booking-count-by-user", getBookingCountByUser);

// Thống kê số lượng booking 
router.get("/statistics/booking-count-by-hotel", getBookingCountByHotel);

// Thống kê doanh thu 
router.get("/statistics/booking-revenue-hotel",getRevenueByHotel );

//Thống kê những khách sạn chưa từng có số lượng đặt phòng nào
router.get("/statistics/hotel-no-booking", getHotelsWithNoBookings);
router.get("/statistics/getTotalBookings", getTotalBookings );
router.get("/statistics/getBookingDays", getBookingDays );
router.get("/statistics/getMostBookedDay",getMostBookedDay);
router.get("/statistics/getHotelsWithNoBookingsAllTime", getHotelsWithNoBookingsAllTime);
router.get("/statistics/getRevenueByHotelAllTime", getRevenueByHotelAllTime);
router.get("/statistics/getBookingCountByHotelAllTime", getBookingCountByHotelAllTime);
router.get("/statistics/getTotalRevenueAllTime", getTotalRevenueAllTime);
router.get("/statistics/getBookingCountByUserAllTime", getBookingCountByUserAllTime );
router.get("/statistics/getBookingsWithinDateRange", getBookingsWithinDateRange );
router.get("/hotelAdmin/:idAdmin", getBookingByAdminId);

//Thống kê doanh thu của khách sạn (theoAdmin)
router.get("/getRevenueByAdmin/:idAdmin", getRevenueByAdmin);
export default router;
