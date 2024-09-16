import React from 'react';


const ReviewList = ({ reviews, onEdit, onDelete }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="review-list">
        <h3>Đánh giá không có</h3>
      </div>
    );
  }

  return (
    <div className="review-list">
      <h3>Xem Bình Luận</h3>
      {reviews.map((review) => (
        <div className="review-item" key={review._id}>
          <p><strong>Khách sạn:</strong> {review.hotelId.name}</p>
          <p><strong>Phòng:</strong> {review.roomId.title}</p>
          <p><strong>Đánh giá sao:</strong> {review.rating}</p>
          <p><strong>Bình luận:</strong> {review.comment}</p>
          <p><strong>Ngày đăng:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
          <p><strong>Người đăng:</strong> {review.userId._id}</p> {/* Thay đổi nếu có tên người dùng cụ thể */}
          <div className="review-buttons">
            <button className="btn-primary" onClick={() => onEdit(review)}>Chỉnh Sửa</button>
            <button className="btn-danger" onClick={() => onDelete(review._id)}>Xoá</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
