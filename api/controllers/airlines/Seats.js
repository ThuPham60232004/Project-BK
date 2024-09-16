import Seats from "../../models/airlines/Seats.js";

// Hàm tạo ghế mới
export const createSeats = async (req, res) => {
  const {  seatNumber,idAdmin, seatClass, isAvailable, flightId } = req.body;
  try {
    const newSeats = new Seats({
      seatNumber,
      seatClass,
      isAvailable,
      flightId,
      idAdmin
    });
    await newSeats.save();
    res.status(200).json(newSeats);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Hàm xóa ghế
export const deleteSeats = async (req, res, next) => {
  try {
    await Seats.findByIdAndDelete(req.params.id);
    res.status(200).json("Ghế ngồi đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

// Hàm lấy thông tin một ghế
export const getSeat = async (req, res, next) => {
  try {
    const seat = await Seats.findById(req.params.id);
    res.status(200).json(seat);
  } catch (err) {
    next(err);
  }
};

// Hàm lấy tất cả các ghế
export const getSeats = async (req, res, next) => {
  try {
    const seats = await Seats.find();
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
};

// Hàm cập nhật thông tin một ghế cụ thể
export const updateSeat = async (req, res, next) => {
  try {
    const updatedSeat = await Seats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // Trả về bản cập nhật và chạy các bộ xác thực
    );
    if (!updatedSeat) {
      return res.status(404).json("Ghế ngồi không tìm thấy.");
    }
    res.status(200).json(updatedSeat);
  } catch (err) {
    next(err);
  }
};

// Hàm cập nhật thông tin nhiều ghế
export const updateSeats = async (req, res, next) => {
  try {
    const { seatUpdates } = req.body;  // seatUpdates là một mảng các đối tượng ghế và cập nhật
    const updatePromises = seatUpdates.map(update => 
      Seats.findByIdAndUpdate(
        update.id,
        update.update,
        { new: true, runValidators: true }
      )
    );
    const updatedSeats = await Promise.all(updatePromises);
    res.status(200).json(updatedSeats);
  } catch (err) {
    next(err);
  }
};
