import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ initialData = { rating: 0, comment: '', hotelName: '', roomTitle: '' }, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [comment, setComment] = useState(initialData?.comment || '');
  const [images, setImages] = useState([]); // State for images

  const handleRatingChange = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 5) {
      setRating(numericValue);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Store the selected files
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      rating,
      comment,
      images: images.map(file => URL.createObjectURL(file)), // Convert files to URLs for preview
    };
    onSubmit(formData);
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
      <div className="form-group">
        <label>Hình ảnh:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-primary">Gửi</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Huỷ</button>
      </div>
      {images.length > 0 && (
        <div className="image-preview">
          {images.map((img, index) => (
            <img key={index} src={URL.createObjectURL(img)} alt={`preview-${index}`} />
          ))}
        </div>
      )}
    </form>
  );
};

export default ReviewForm;
