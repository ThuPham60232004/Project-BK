import Airplanes from "../../models/airlines/Airplanes.js";

// Tạo mới Airplanes
export const createAirplanes = async (req, res) => {
  const {registrationNumber, make, model, capacity, range, fuelCapacity, lastMaintenanceDate, isOperational,idAdmin} = req.body;
  try {
    const newAirplanes = new Airplanes({
      registrationNumber, make, model, capacity, range, fuelCapacity, lastMaintenanceDate, isOperational,idAdmin
    });
    await newAirplanes.save();
    res.status(200).json(newAirplanes);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Cập nhật Airplanes
export const updateAirplanes = async (req, res, next) => {
  try {
    const updatedAirplanes = await Airplanes.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAirplanes);
  } catch (err) {
    next(err);
  }
};

// Xóa Airplanes
export const deleteAirplanes = async (req, res, next) => {
  try {
    await Airplanes.findByIdAndDelete(req.params.id);
    res.status(200).json("Máy bay đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

// Lấy thông tin một Airplane
export const getAirplane = async (req, res, next) => {
  try {
    const airplane = await Airplanes.findById(req.params.id);
    res.status(200).json(airplane);
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách Airplanes
export const getAirplanes = async (req, res, next) => {
  try {
    const airplanes = await Airplanes.find();
    res.status(200).json(airplanes);
  } catch (err) {
    next(err);
  }
};

