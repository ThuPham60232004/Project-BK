import Booking from "../../models/hotels/Booking.js";
import Notification from "../../models/Notification.js";
import moment from 'moment';
import Hotel from "../../models/hotels/Hotel.js"; 

// Tạo một booking mới
export const createBooking = async (req, res) => {
  const { user, hotel, room, startDate, endDate, totalPrice, checkintime,paymentMethod,hotel_deposit,idAdmin} = req.body;

  try {
    const newBooking = new Booking({
      user,
      hotel,
      room,
      startDate,
      endDate,
      checkintime,
      totalPrice,
      hotel_deposit,
      paymentMethod,
      idAdmin
    });
    await newBooking.save();


    const message = `Booking mới đã được tạo cho khách sạn ${hotel}.`;
    const newNotification = new Notification({ user, message });
    await newNotification.save();

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getBookingByAdminId = async (req, res, next) => {
  const idAdmin= req.params.idAdmin;
  try {
    const booking = await Booking.find({ idAdmin });
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};
// Lấy một booking theo ID
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "username email")
      .populate("hotel", "name address")
      .populate("room", "title price");
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Cập nhật một booking
export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // Gửi thông báo
    const message = `Booking của bạn đã được cập nhật.`;
    const newNotification = new Notification({ user: updatedBooking.user, message });
    await newNotification.save();

    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Xóa một booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    // Gửi thông báo
    const message = `Booking của bạn đã bị xóa.`;
    const newNotification = new Notification({ user: booking.user, message });
    await newNotification.save();

    res.status(200).json("Booking đã bị xóa.");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy tất cả các bookings của một người dùng
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("hotel", "name address")
      .populate("room", "title price");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lịch sử booking của người dùng
export const getBookingHistory = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("hotel", "name address")  
      .populate("room", "title price");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Hủy phòng của người dùng
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json("Booking không tồn tại.");
    }

    booking.status = "cancelled";
    await booking.save();

    // Gửi thông báo
    const message = `Booking của bạn đã bị hủy.`;
    const newNotification = new Notification({ user: booking.user, message });
    await newNotification.save();

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getBookingCount = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const selectedStartDate = moment(startDate).startOf('day').toDate();
    const selectedEndDate = moment(endDate).endOf('day').toDate();

    const count = await Booking.countDocuments({
      createdAt: { $gte: selectedStartDate, $lte: selectedEndDate }
    });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getTotalRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const selectedStartDate = moment(startDate).startOf('day').toDate();
    const selectedEndDate = moment(endDate).endOf('day').toDate();

    const totalRevenue = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: selectedStartDate, $lte: selectedEndDate },
          status: "confirmed"
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }
        }
      }
    ]);

    res.status(200).json({ totalRevenue: totalRevenue[0]?.totalRevenue || 0 });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getBookingCountByUser = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const selectedStartDate = moment(startDate).startOf('day').toDate();
    const selectedEndDate = moment(endDate).endOf('day').toDate();

    const countByUser = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: selectedStartDate, $lte: selectedEndDate }
        }
      },
      {
        $group: {
          _id: "$user",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(countByUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getBookingCountByHotel = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const selectedStartDate = moment(startDate).startOf('day').toDate();
    const selectedEndDate = moment(endDate).endOf('day').toDate();

    const countByHotel = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: selectedStartDate, $lte: selectedEndDate }
        }
      },
      {
        $group: {
          _id: "$hotel",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(countByHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getRevenueByHotel = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const selectedStartDate = moment(startDate).startOf('day').toDate();
    const selectedEndDate = moment(endDate).endOf('day').toDate();

    const revenueByHotel = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: selectedStartDate, $lte: selectedEndDate },
          status: "confirmed"
        }
      },
      {
        $group: {
          _id: "$hotel",
          totalRevenue: { $sum: "$totalPrice" }
        }
      },
      {
        $sort: {
          totalRevenue: -1
        }
      }
    ]);

    // Populate thông tin khách sạn
    const populatedRevenueByHotel = await Hotel.populate(revenueByHotel, { path: "_id", select: "name" });

    res.status(200).json(populatedRevenueByHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getHotelsWithNoBookings = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const selectedStartDate = moment(startDate).startOf('day').toDate();
    const selectedEndDate = moment(endDate).endOf('day').toDate();

    // Lấy danh sách các khách sạn có ít nhất một booking
    const hotelsWithBookings = await Booking.distinct("hotel", {
      createdAt: { $gte: selectedStartDate, $lte: selectedEndDate }
    });

    // Tìm các khách sạn chưa có booking nào
    const hotelsWithNoBookings = await Hotel.find({
      _id: { $nin: hotelsWithBookings }
    }).select("name address");

    res.status(200).json(hotelsWithNoBookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy tất cả bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "username img") 
      .populate("hotel", "name") 
      .populate("room", "title") 
      .exec();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error: err.message });
  }
};


// Tổng số lượng booking
export const getTotalBookings = async (req, res) => {
  try {
    const count = await Booking.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Doanh thu tổng cộng từ tất cả các booking
export const getTotalRevenueAllTime = async (req, res) => {
  try {
    const totalRevenue = await Booking.aggregate([
      {
        $match: {
          status: "confirmed"
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }
        }
      }
    ]);

    res.status(200).json({ totalRevenue: totalRevenue[0]?.totalRevenue || 0 });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Thống kê số lượng booking theo người dùng tất cả thời gian
export const getBookingCountByUserAllTime = async (req, res) => {
  try {
    const countByUser = await Booking.aggregate([
      {
        $group: {
          _id: "$user",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(countByUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Thống kê số lượng booking theo khách sạn tất cả thời gian
export const getBookingCountByHotelAllTime = async (req, res) => {
  try {
    const countByHotel = await Booking.aggregate([
      {
        $group: {
          _id: "$hotel",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(countByHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Doanh thu theo khách sạn tất cả thời gian
export const getRevenueByHotelAllTime = async (req, res) => {
  try {
    const revenueByHotel = await Booking.aggregate([
      {
        $match: {
          status: "confirmed"
        }
      },
      {
        $group: {
          _id: "$hotel",
          totalRevenue: { $sum: "$totalPrice" }
        }
      },
      {
        $sort: {
          totalRevenue: -1
        }
      }
    ]);

    // Populate hotel details
    const populatedRevenueByHotel = await Hotel.populate(revenueByHotel, { path: "_id", select: "name" });

    res.status(200).json(populatedRevenueByHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy các khách sạn chưa có booking tất cả thời gian
export const getHotelsWithNoBookingsAllTime = async (req, res) => {
  try {
    // Lấy danh sách các khách sạn có ít nhất một booking
    const hotelsWithBookings = await Booking.distinct("hotel");

    // Tìm các khách sạn chưa có booking nào
    const hotelsWithNoBookings = await Hotel.find({
      _id: { $nin: hotelsWithBookings }
    }).select("name address");

    res.status(200).json(hotelsWithNoBookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Thống kê số lượng booking theo ngày
export const getBookingDays = async (req, res) => {
  try {
    const bookingsPerDay = await Booking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json(bookingsPerDay);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Ngày có số lượng booking nhiều nhất
export const getMostBookedDay = async (req, res) => {
  try {
    const mostBookedDay = await Booking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 1
      }
    ]);

    res.status(200).json(mostBookedDay[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy tất cả bookings trong khoảng thời gian cụ thể
export const getBookingsWithinDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const bookings = await Booking.find({
      startDate: { $gte: new Date(startDate) },
      endDate: { $lte: new Date(endDate) }
    }).populate("hotel", "name address").populate("room", "title price");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Thống kê doanh thu của khách sạn (theo idAdmin)
export const getRevenueByAdmin = async (req, res) => {
  const idAdmin = req.params.idAdmin;
  const { startDate, endDate } = req.query;

  try {
    const selectedStartDate = moment(startDate).startOf('day').toDate();
    const selectedEndDate = moment(endDate).endOf('day').toDate();

    const totalRevenue = await Booking.aggregate([
      {
        $match: {
          idAdmin,
          createdAt: { $gte: selectedStartDate, $lte: selectedEndDate },
          status: "confirmed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({ totalRevenue: totalRevenue[0]?.totalRevenue || 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

