import React, { useEffect, useState } from 'react';
import { getReviews, deleteReview, updateReview } from '../../services/reviewService.js';
import './Reviews.css';
import Navbar from '../../components/HotelComponents/navbar/Navbar.jsx';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedComment, setUpdatedComment] = useState('');

  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Lỗi khi tìm bài đánh giá:', error);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Lỗi xóa bài đánh giá:', error);
    }
  };

  const handleEdit = (reviewId, comment) => {
    setEditMode(reviewId);
    setUpdatedComment(comment);
  };

  const handleUpdate = async (reviewId) => {
    try {
      await updateReview(reviewId, { comment: updatedComment, edited: true });
      setReviews(reviews.map((review) =>
        review._id === reviewId ? { ...review, comment: updatedComment} : review
      ));
      setEditMode(null);
    } catch (error) {
      console.error('Lỗi cập nhật đánh giá:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="reviews-container"> 
        <h2>Danh sách bình luận</h2>
        {reviews.length === 0 ? (
          <p>Chưa có bình luận nào.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className='timereview'>
                <p>Thời gian tạo: {new Date(review.createdAt).toLocaleString()}</p>
                <p>Thời gian cập nhật: {new Date(review.updatedAt).toLocaleString()}</p>
              </div>
              {review.images && review.images.length > 0 && (
                <div className="image-gallery">
                  {review.images.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Review image ${index + 1}`} className="review-image" />
                  ))}
                </div>
              )}
              <h3 className="review-user">Người dùng: {review.userId?.email || 'N/A'}</h3>
              <p>Khách sạn: {review.hotelId?.name || 'N/A'}</p>
              <p>Phòng: {review.roomId?.title || 'N/A'}</p>
              <p>Đánh giá: {review.rating}</p>
              
              {editMode === review._id ? (
                <div className="edit-section">
                  <textarea
                    value={updatedComment}
                    onChange={(e) => setUpdatedComment(e.target.value)}
                    rows={4}
                    className="comment-input"
                  />
                  <br/>
                  <button className="update-button" onClick={() => handleUpdate(review._id)}>Cập nhật</button>
                  <button className="cancel-button" onClick={() => setEditMode(null)}>Hủy</button>
                </div>
              ) : (
                <div className="review-content">
                  <p>Bình luận: {review.comment} {review.edited && <em>(đã chỉnh sửa)</em>}</p>
                  {review.userId?._id === currentUserId && ( 
                    <>
                      <button className="edit-button" onClick={() => handleEdit(review._id, review.comment)}>Chỉnh sửa</button>
                      <button className="delete-button" onClick={() => handleDelete(review._id)}>Xóa</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
