import Luggage from "../../models/airlines/Luggage.js";

export const createLuggage = async (req, res) => {
  const { nameLuggage, weightChecked, type, weightCarryOn,idAdmin } = req.body;
  try {
    const newLuggage = new Luggage({
      nameLuggage,
      weightChecked,
      type,
      weightCarryOn,
      idAdmin
    });
    await newLuggage.save();
    res.status(200).json(newLuggage);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Cập nhật Luggage
export const updateLuggage = async (req, res, next) => {
  try {
    const updatedLuggage = await Luggage.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // Trả về tài liệu đã cập nhật
    );
    res.status(200).json(updatedLuggage);
  } catch (err) {
    next(err);
  }
};

// Xóa Luggage
export const deleteLuggage = async (req, res, next) => {
  try {
    await Luggage.findByIdAndDelete(req.params.id);
    res.status(200).json("Hành lý đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

// Lấy thông tin một Luggage
export const getLuggage = async (req, res, next) => {
  try {
    const luggage = await Luggage.findById(req.params.id);
    res.status(200).json(luggage);
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách Luggages
export const getLuggages = async (req, res, next) => {
  try {
    const luggages = await Luggage.find();
    res.status(200).json(luggages);
  } catch (err) {
    next(err);
  }
};