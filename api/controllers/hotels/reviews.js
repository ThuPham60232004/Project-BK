import Review from "../../models/hotels/Review.js";
import Hotel from "../../models/hotels/Hotel.js";
import Room from "../../models/hotels/Room.js";

// Function to update the average rating and number of reviews
const updateRatingAndReviews = async (model, id, newRating, operation) => {
  const doc = await model.findById(id);
  if (operation === 'add') {
    doc.numberOfReviews += 1;
    doc.rating = (doc.rating * (doc.numberOfReviews - 1) + newRating) / doc.numberOfReviews;
  } else if (operation === 'update') {
    doc.rating = (doc.rating * doc.numberOfReviews - doc.previousRating + newRating) / doc.numberOfReviews;
  } else if (operation === 'delete') {
    doc.numberOfReviews -= 1;
    doc.rating = doc.numberOfReviews > 0 ? (doc.rating * (doc.numberOfReviews + 1) - newRating) / doc.numberOfReviews : 0;
  }
  await doc.save();
};

// Create a review
const createReview = async (req, res) => {
  try {
    const { userId, hotelId, roomId, rating, comment, idAdmin } = req.body;
    const review = new Review({
      userId,
      hotelId,
      roomId,
      rating,
      comment,
      idAdmin,
    });
    await review.save();

    if (hotelId) await updateRatingAndReviews(Hotel, hotelId, rating, 'add');
    if (roomId) await updateRatingAndReviews(Room, roomId, rating, 'add');

    res.status(201).json({ message: "Đã tạo đánh giá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Không tạo được đánh giá", error: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ message: "Không tìm thấy bài đánh giá" });
    }

    const previousRating = existingReview.rating;
    existingReview.rating = rating;
    existingReview.comment = comment;

    await existingReview.save();

    if (existingReview.hotelId) await updateRatingAndReviews(Hotel, existingReview.hotelId, rating, 'update');
    if (existingReview.roomId) await updateRatingAndReviews(Room, existingReview.roomId, rating, 'update');

    res.status(200).json({ message: "Đã cập nhật đánh giá thành công", review: existingReview });
  } catch (error) {
    res.status(500).json({ message: "Không cập nhật được bài đánh giá", error: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ message: "Không tìm thấy bài đánh giá" });
    }

    const rating = existingReview.rating;
    if (existingReview.hotelId) await updateRatingAndReviews(Hotel, existingReview.hotelId, rating, 'delete');
    if (existingReview.roomId) await updateRatingAndReviews(Room, existingReview.roomId, rating, 'delete');

    await Review.findByIdAndDelete(id);

    res.status(200).json({ message: "Đã xóa đánh giá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Không thể xóa bài đánh giá", error: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', '_id') 
      .populate('hotelId', 'name') 
      .populate('roomId', 'title'); 
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Không thể nhận được đánh giá", error: error.message });
  }
};

// Get a single review
const getReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy bài đánh giá" });
    }

    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: "Không thể nhận được đánh giá", error: error.message });
  }
};

// Search reviews
const searchReviews = async (req, res) => {
  const { userId, hotelId, roomId, rating, comment, dateFrom, dateTo } = req.query;

  try {
    const query = {};

    if (userId) query.userId = userId;
    if (hotelId) query.hotelId = hotelId;
    if (roomId) query.roomId = roomId;
    if (rating) query.rating = rating; // Lọc theo rating
    if (comment) query.comment = { $regex: new RegExp(comment, 'i') }; // Tìm kiếm theo phần của nội dung bình luận
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const reviews = await Review.find(query).sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo, mới nhất trước
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Không thể tìm kiếm đánh giá", error: error.message });
  }
};
// Get a review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('userId', '_id') 
      .populate('hotelId', 'name') 
      .populate('roomId', 'title'); 

    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy bài đánh giá" });
    }

    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: "Không thể nhận được bài đánh giá", error: error.message });
  }
};
export const getReviewByAdminId = async (req, res, next) => {
  const idAdmin= req.params.idAdmin;
  try {
    const review = await Review.find({ idAdmin });
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};
export { createReview, getReview, getAllReviews, updateReview, deleteReview, searchReviews,getReviewById  };
