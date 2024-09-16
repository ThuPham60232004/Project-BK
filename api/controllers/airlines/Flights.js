import Flights from "../../models/airlines/Flights.js";
// Tạo mới Flights
export const createFlights = async (req, res) => {
  const {
    airplaneId,
    airlineID,
    flightNumber,
    departureCity,
    arrivalCity,
    departureTime,
    arrivalTime,
    duration,
    status,
    idAdmin
  } = req.body;
  try {
    const newFlights = new Flights({
      airlineID,
      airplaneId,
      flightNumber,
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      duration,
      status,
      idAdmin
    });
    await newFlights.save();
    res.status(200).json(newFlights);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Cập nhật Flights
export const updateFlights = async (req, res, next) => {
  try {
    const updatedFlights = await Flights.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // Trả về tài liệu đã cập nhật
    );
    res.status(200).json(updatedFlights);
  } catch (err) {
    next(err);
  }
};

// Xóa Flights
export const deleteFlights = async (req, res, next) => {
  try {
    await Flights.findByIdAndDelete(req.params.id);
    res.status(200).json("Chuyến bay đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

// Lấy thông tin một Flights
export const getFlight = async (req, res, next) => {
  try {
    const flight = await Flights.findById(req.params.id);
    res.status(200).json(flight);
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách Flights
export const getFlights = async (req, res, next) => {
  try {
    const flights = await Flights.find();
    res.status(200).json(flights);
  } catch (err) {
    next(err);
  }
};