import Meals from "../../models/airlines/Meals.js";

// Tạo mới Meals
export const createMeals = async (req, res) => {
  const { name, description,idAdmin, imageUrl, price, availability } = req.body;
  try {
    const newMeal = new Meals({
      name,
      description,
      imageUrl,
      price,
      availability,
      idAdmin
    });
    await newMeal.save();
    res.status(200).json(newMeal);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Cập nhật Meals
export const updateMeals = async (req, res, next) => {
  try {
    const updatedMeal = await Meals.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } 
    );
    res.status(200).json(updatedMeal);
  } catch (err) {
    next(err);
  }
};

// Xóa Meals
export const deleteMeals = async (req, res, next) => {
  try {
    await Meals.findByIdAndDelete(req.params.id);
    res.status(200).json("Bữa ăn đã bị xóa.");
  } catch (err) {
    next(err);
  }
};

// Lấy thông tin một Meals
export const getMeal = async (req, res, next) => {
  try {
    const meal = await Meals.findById(req.params.id);
    res.status(200).json(meal);
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách Meals
export const getMeals = async (req, res, next) => {
  try {
    const meals = await Meals.find();
    res.status(200).json(meals);
  } catch (err) {
    next(err);
  }
};
