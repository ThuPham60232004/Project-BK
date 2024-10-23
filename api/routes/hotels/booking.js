import express from "express";
import { getBookingDays,getBookingByAdminId,
    getMostBookedDay,createBooking,getBooking, updateBooking, 
    deleteBooking,getBookingsWithinDateRange, getUserBookings, getBookingHistory, 
    cancelBooking, getBookingCount, getTotalRevenue, getBookingCountByUser, 
    getBookingCountByHotel,getAllBookings,getRevenueByHotel, 
    getHotelsWithNoBookings ,getHotelsWithNoBookingsAllTime,getRevenueByHotelAllTime,
    getBookingCountByHotelAllTime,getTotalRevenueAllTime,getBookingCountByUserAllTime,
    getTotalBookings,getRevenueByAdmin,getBookingByHotelId,countBookings,getTotalRevenuePending} from "../../controllers/hotels/booking.js";

const router = express.Router();

router.get("/countBookings", countBookings); 
router.post("/", createBooking);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/user/:userId", getUserBookings);
router.get("/", getAllBookings);
router.get("/user/:userId/history", getBookingHistory);
router.put("/:id/cancel", cancelBooking);
router.get("/statistics/booking-count", getBookingCount);
router.get("/statistics/total-revenue", getTotalRevenue);
router.get("/statistics/booking-count-by-user", getBookingCountByUser);
router.get("/statistics/booking-count-by-hotel", getBookingCountByHotel);
router.get("/statistics/booking-revenue-hotel",getRevenueByHotel );
router.get("/statistics/hotel-no-booking", getHotelsWithNoBookings);
router.get("/statistics/getTotalBookings", getTotalBookings );
router.get("/statistics/getBookingDays", getBookingDays );
router.get("/statistics/getMostBookedDay",getMostBookedDay);
router.get("/statistics/getHotelsWithNoBookingsAllTime", getHotelsWithNoBookingsAllTime);
router.get("/statistics/getBookingCountByHotelAllTime", getBookingCountByHotelAllTime);
router.get("/statistics/getTotalRevenueAllTime", getTotalRevenueAllTime);
router.get("/statistics/getBookingCountByUserAllTime", getBookingCountByUserAllTime );
router.get("/statistics/getBookingsWithinDateRange", getBookingsWithinDateRange );
router.get("/hotelAdmin/:idAdmin", getBookingByAdminId);
router.get("/getRevenueByAdmin/:idAdmin", getRevenueByAdmin);
router.get("/getbyhotel/:idHotel", getBookingByHotelId); 
router.get("/statistics/getRevenueByHotelAllTime", getRevenueByHotelAllTime);
router.get("/statistics/getTotalRevenuePending",getTotalRevenuePending);
export default router;
