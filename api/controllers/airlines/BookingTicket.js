import BookingTicket from "../../models/airlines/BookingTicket.js";

// Tạo mới BookingTicket
// Tạo mới BookingTicket
export const createBookingTicket = async (req, res) => {
  const { userId, flightId, seatId, passengerName, passportNumber, bookingDate, totalAmount, paymentStatus, mealId, luggageFeeId, idAdmin } = req.body;
  try {
    const newBookingTicket = new BookingTicket({
      userId, flightId, seatId, passengerName, passportNumber, bookingDate, totalAmount, paymentStatus, mealId, luggageFeeId, idAdmin
    });
    await newBookingTicket.save();
    res.status(200).json(newBookingTicket);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Cập nhật BookingTicket
export const updateBookingTicket = async (req, res, next) => {
  try {
    const updatedBookingTicket = await BookingTicket.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } 
    );
    res.status(200).json(updatedBookingTicket);
  } catch (err) {
    next(err);
  }
};

// Xóa BookingTicket
export const deleteBookingTicket = async (req, res, next) => {
  try {
    await BookingTicket.findByIdAndDelete(req.params.id);
    res.status(200).json("Vé đã bị hủy.");
  } catch (err) {
    next(err);
  }
};

// Lấy thông tin một BookingTicket
export const getBookingTicket = async (req, res, next) => {
  try {
    const bookingTicket = await BookingTicket.findById(req.params.id);
    res.status(200).json(bookingTicket);
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách BookingTickets
export const getBookingTickets = async (req, res, next) => {
  try {
    const bookingTickets = await BookingTicket.find();
    res.status(200).json(bookingTickets);
  } catch (err) {
    next(err);
  }
};