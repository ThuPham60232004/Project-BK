import React, { useState, useEffect } from 'react';
import { createReview, updateReview, deleteReview, getReviews } from '../../../services/reviewService';
import ReviewForm from '../../../components/hotelcomponents/ReviewForm/ReviewForm';
import ReviewList from '../../../components/hotelcomponents/ReviewList/ReviewList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ReviewManager.css';
import Navbar from "../../../components/hotelcomponents/navbar/Navbar";

const ReviewManager = () => {
  const [currentReview, setCurrentReview] = useState(null);
  const userId = localStorage.getItem('userId');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await getReviews(userId);
      const reviewsData = Array.isArray(response.reviews) ? response.reviews : [];
      setReviews(reviewsData);
    } catch (error) {
      console.error('Không tìm được bài đánh giá:', error);
      toast.error('Không tìm được bài đánh giá');
      setReviews([]);
    }
  };

  const handleCreateReview = async (reviewData) => {
    try {
      await createReview({ ...reviewData, userId });
      fetchReviews();
      toast.success('Tạo bài đánh giá thành công');
    } catch (error) {
      console.error('Không tạo được bài đánh giá:', error);
      toast.error('Không tạo được bài đánh giá');
    }
  };

  const handleUpdateReview = async (reviewData) => {
    try {
      await updateReview(currentReview._id, reviewData);
      fetchReviews();
      setCurrentReview(null);
      toast.success('Cập nhật bài đánh giá thành công');
    } catch (error) {
      console.error('Không cập nhật được bài đánh giá:', error);
      toast.error('Không cập nhật được bài đánh giá');
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id);
      fetchReviews();
      toast.success('Xóa bài đánh giá thành công');
    } catch (error) {
      console.error('Không thể xóa bài đánh giá:', error);
      toast.error('Không thể xóa bài đánh giá');
    }
  };

  const handleEdit = (review) => {
    setCurrentReview(review);
  };

  const handleCancelEdit = () => {
    setCurrentReview(null);
  };

  return (
    <div className="review-manager">
      <Navbar />
      <br /> <br /> <br /> <br /> <br />
      <h1>Đánh giá</h1>
      <ToastContainer />
      <ReviewForm
        onSubmit={currentReview ? handleUpdateReview : handleCreateReview}
        initialData={currentReview}
        onCancel={handleCancelEdit}
      />
      {currentReview && <button onClick={handleCancelEdit}>Xoá</button>}
      <ReviewList
        reviews={reviews}
        onEdit={handleEdit}
        onDelete={handleDeleteReview}
      />
    </div>
  );
};

export default ReviewManager;
