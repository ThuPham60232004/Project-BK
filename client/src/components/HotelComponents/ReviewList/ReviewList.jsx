import React, { useState } from "react";
import './ReviewList.css';

const ReviewList = ({ reviews, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleNext = (reviewId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
  };

  const handlePrev = (reviewId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) - 1,
    }));
  };

  return (
    <div className="review-list">
      {reviews.map((review) => {
        // Kiểm tra xem hotelId và roomId có tồn tại không
        const hotelImages = review.hotelId && review.hotelId.images ? review.hotelId.images : [];
        const roomImages = review.roomId && review.roomId.images ? review.roomId.images : [];
        const allImages = [...hotelImages, ...roomImages];

        return (
          <div className="review-item" key={review._id}>
            {/* Carousel Images */}
            <div className="carousel">
              {allImages.length > 0 && (
                <>
                  <img
                    src={allImages[currentImageIndex[review._id] || 0]}
                    alt="Đánh giá"
                    className="carousel-image"
                  />
                  <div className="carousel-button prev" onClick={() => handlePrev(review._id)} disabled={currentImageIndex[review._id] <= 0}>
                    &#10094;
                  </div>
                  <div className="carousel-button next" onClick={() => handleNext(review._id)} disabled={currentImageIndex[review._id] >= allImages.length - 1}>
                    &#10095; 
                  </div>
                </>
              )}
            </div>
            <p><strong>Khách sạn:</strong> {review.hotelId ? review.hotelId.name : 'N/A'}</p>
            <p><strong>Phòng:</strong> {review.roomId ? review.roomId.title : 'N/A'}</p>
            <p><strong>Đánh giá sao:</strong> {review.rating}</p>
            <p><strong>Bình luận:</strong> {review.comment}</p>
            <p><strong>Ngày đăng:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
            <p><strong>Người đăng:</strong> {review.userId.username}</p>

            

            <div className="review-buttons">
              <button className="btn-primary" onClick={() => onEdit(review)}>Chỉnh Sửa</button>
              <button className="btn-danger" onClick={() => onDelete(review._id)}>Xoá</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
