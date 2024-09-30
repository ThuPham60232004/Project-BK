import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ initialData = { rating: 0, comment: '', hotelName: '', roomTitle: '' }, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [comment, setComment] = useState(initialData?.comment || '');

  const handleRatingChange = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 5) {
      setRating(numericValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Khách sạn:</label>
        <input type="text" value={initialData.hotelName} readOnly className="readonly-input" />
      </div>
      <div className="form-group">
        <label>Phòng:</label>
        <input type="text" value={initialData.roomTitle} readOnly className="readonly-input" />
      </div>
      <div className="form-group">
        <label>Đánh giá sao:</label>
        <input
          type="number"
          value={rating}
          onChange={handleRatingChange}
          min="0"
          max="5"
          step="1"
        />
      </div>
      <div className="form-group">
        <label>Bình luận:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-primary">Gửi</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Huỷ</button>
      </div>
    </form>
  );
};

export default ReviewForm;
