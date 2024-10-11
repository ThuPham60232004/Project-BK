import DiscountCode from "../../models/hotels/DiscountCode.js";

export const getAllDiscountCodes = async (req, res) => {
  try {
    const now = new Date();
    const discountCodes = await DiscountCode.find({ expirationDate: { $gte: now } });
    res.json(discountCodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDiscountCodeById = async (req, res) => {
  const { id } = req.params;
  try {
    const discountCode = await DiscountCode.findById(id);
    if (!discountCode) {
      return res.status(404).json({ message: 'Mã giảm giá không tìm thấy' });
    }
    res.json(discountCode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const applyDiscountCode = async (req, res) => {
  const { code } = req.body;
  try {
    const discount = await DiscountCode.findOne({ code, expirationDate: { $gte: new Date() } });
    if (!discount) {
      return res.status(404).json({ message: 'Mã giảm giá không tìm thấy' });
    }
    
    let discountAmount = 0;
    if (discount.discountType === 'percentage') {
      discountAmount = discount.discountValue;
    } else if (discount.discountType === 'fixed') {
      discountAmount = discount.discountValue;
    }

    res.json({ discountAmount, discountType: discount.discountType, discountValue: discount.discountValue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDiscountCode = async (req, res) => {
  const { code, discountType, discountValue, expirationDate, amountDiscountCode, startDate } = req.body;
  const newDiscountCode = new DiscountCode({ 
    code,
    discountType,
    discountValue,
    expirationDate,
    amountDiscountCode,
    startDate
  });
  try {
    const savedDiscountCode = await newDiscountCode.save();
    res.status(201).json(savedDiscountCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateDiscountCode = async (req, res) => {
  const { id } = req.params;
  const { code, discountType, discountValue, expirationDate, amountDiscountCode, startDate } = req.body;
  try {
    const updatedDiscountCode = await DiscountCode.findByIdAndUpdate(
      id,
      { code, discountType, discountValue, expirationDate, amountDiscountCode, startDate },
      { new: true }
    );
    if (!updatedDiscountCode) {
      return res.status(404).json({ message: 'Mã giảm giá không tìm thấy' });
    }
    res.json(updatedDiscountCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDiscountCode = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDiscountCode = await DiscountCode.findByIdAndDelete(id);
    if (!deletedDiscountCode) {
      return res.status(404).json({ message: 'Mã giảm giá không thấy' });
    }
    res.json({ message: 'Mã giảm giá được xoá thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDiscountCodeByAdminId = async (req, res, next) => {
  const idAdmin= req.params.idAdmin;
  try {
    const discountCodes = await DiscountCode.find({ idAdmin });
    res.status(200).json(discountCodes);
  } catch (err) {
    next(err);
  }
};