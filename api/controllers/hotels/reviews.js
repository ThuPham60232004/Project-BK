import Review from "../../models/hotels/Review.js";
import Hotel from "../../models/hotels/Hotel.js";
import Room from "../../models/hotels/Room.js";

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


const createReview = async (req, res) => {
  try {
    const { userId, hotelId, roomId, rating, comment, idAdmin,images } = req.body;
    const review = new Review({
      userId,
      hotelId,
      roomId,
      rating,
      comment,
      idAdmin,
      images,
    });
    await review.save();

    if (hotelId) await updateRatingAndReviews(Hotel, hotelId, rating, 'add');
    if (roomId) await updateRatingAndReviews(Room, roomId, rating, 'add');

    res.status(201).json({ message: "Đã tạo đánh giá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Không tạo được đánh giá", error: error.message });
  }
};

const updateReview = async (req, res, next) => {
  try {
    const updateReview = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateReview);
  } catch (err) {
    next(err);
  }
};

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


const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
    res.status(200).json(reviews);
  } catch (error) {
    next(err);
  }
};


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
const getReviewByAdminId = async (req, res, next) => {
  const idAdmin= req.params.idAdmin;
  try {
    const review = await Review.find({ idAdmin });
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};
const getAllReviewsclient = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name email') 
      .populate('hotelId', 'name location') 
      .populate('roomId', 'title') 
      .exec();
    
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy reviews', error });
  }
};
const getReviewByIdclient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  try {
    const review = await Review.findById(id)
      .populate('userId', 'name email')
      .populate('hotelId', 'name location')
      .populate('roomId', 'roomNumber')
      .exec();

    if (!review) {
      return res.status(404).json({ message: 'Không tìm thấy review' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy review', error });
  }
};

export {
  createReview, 
  getReview, 
  getAllReviews, 
  updateReview, 
  getReviewByAdminId, 
  deleteReview, 
  getReviewById,
  getReviewByIdclient,
  getAllReviewsclient
};
