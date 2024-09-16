import LuggageFee from "../../models/airlines/LuggageFee.js";
export const createLuggageFee = async (req, res) => {
  const { idAdmin,nameLuggage,destination, weightChecked, type, fee,departurePoint } = req.body;
  try {
    const newLuggageFee = new LuggageFee({
      nameLuggage,
      weightChecked,
      type,
      fee,
      destination,
      departurePoint,
      idAdmin
    });
    await newLuggageFee.save();
    res.status(200).json(newLuggageFee);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Cập nhật Luggage
export const updateLuggageFee = async (req, res, next) => {
  try {
    const updatedLuggageFee = await LuggageFee.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // Trả về tài liệu đã cập nhật
    );
    res.status(200).json(updatedLuggageFee);
  } catch (err) {
    next(err);
  }
};

// Xóa Luggage
export const deleteLuggageFee = async (req, res, next) => {
  try {
    await LuggageFee.findByIdAndDelete(req.params.id);
    res.status(200).json("Hành lý đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

// Lấy thông tin một Luggage
export const getLuggageFee = async (req, res, next) => {
  try {
    const LuggageFee = await LuggageFee.findById(req.params.id);
    res.status(200).json(LuggageFee);
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách Luggages
export const getLuggageFees = async (req, res, next) => {
  try {
    const luggageFees = await LuggageFee.find();
    res.status(200).json(luggageFees);
  } catch (err) {
    next(err);
  }
};