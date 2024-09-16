import DiscountCodesAirplane from "../../models/airlines/DiscountCodesAirplane.js";

// Tạo mới DiscountCodes
export const createDiscountCodesAirplane = async (req, res) => {
  const { code, discountType, discountValue, startDate, expirationDate, amountDiscountCode, idAdmin } = req.body;
  try {
    const newDiscountCodesAirplane = new DiscountCodesAirplane({
      code, discountType, discountValue, startDate, expirationDate, amountDiscountCode, idAdmin
    });
    await newDiscountCodesAirplane.save();
    res.status(200).json(newDiscountCodesAirplane);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const applyDiscountCodeAirplane = async (req, res) => {
  const { code } = req.body;
  try {
    const discount = await DiscountCodesAirplane.findOne({
      code,
      expirationDate: { $gte: new Date() }, 
      startDate: { $lte: new Date() } 
    });

    if (!discount) {
      return res.status(404).json({ message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' });
    }

    let discountAmount = 0;
    if (discount.discountType === 'percentage') {
      discountAmount = discount.discountValue;
    } else if (discount.discountType === 'fixed') {
      discountAmount = discount.discountValue;
    }

    res.json({
      success: true,
      discountAmount,
      discountType: discount.discountType,
      discountValue: discount.discountValue
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: err.message });
  }
};


// Cập nhật DiscountCodes
export const updateDiscountCodesAirplane = async (req, res, next) => {
  try {
    const updatedDiscountCodesAirplane = await DiscountCodesAirplane.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // Trả về tài liệu đã cập nhật
    );
    res.status(200).json(updatedDiscountCodesAirplane);
  } catch (err) {
    next(err);
  }
};

// Xóa DiscountCodes
export const deleteDiscountCodesAirplane = async (req, res, next) => {
  try {
    await DiscountCodesAirplane.findByIdAndDelete(req.params.id);
    res.status(200).json("Mã giảm giá đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

// Lấy thông tin một DiscountCode
export const getDiscountCodeAirplane = async (req, res, next) => {
  try {
    const discountCodeAirplane = await DiscountCodesAirplane.findById(req.params.id);
    res.status(200).json(discountCodeAirplane);
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách DiscountCodes
export const getDiscountCodesAirplanes= async (req, res, next) => {
  try {
    const discountCodesAirplane = await DiscountCodesAirplane.find();
    res.status(200).json(discountCodesAirplane);
  } catch (err) {
    next(err);
  }
};
