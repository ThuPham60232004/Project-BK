import React, { useState } from 'react';
import axios from 'axios';
import './NewHotels.css';

const NewHotels = () => {
  const [hotelData, setHotelData] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    distance: '',
    title: '',
    desc: '',
    rating: '',
    cheapestPrice: '',
    featured: false,
    photos: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleFeaturedChange = () => {
    setHotelData({ ...hotelData, featured: !hotelData.featured });
  };

  const handlePhotosChange = (event) => {
    const files = Array.from(event.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setHotelData({ ...hotelData, photos: fileUrls });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/hotels/', hotelData);
      alert('Thêm khách sạn thành công!');
    } catch (err) {
      console.error(err);
      alert('Lỗi khi thêm khách sạn.');
    }
  };

  return (
    <div className="new-hotels-container">
      <h2 className="new-hotels-title">Thêm khách sạn mới</h2>
      <form className="new-hotels-form" onSubmit={handleFormSubmit}>
        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="name">Tên khách sạn:</label>
          <input
            id="name"
            name="name"
            type="text"
            className="new-hotels-input"
            value={hotelData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="type">Loại hình:</label>
          <input
            id="type"
            name="type"
            type="text"
            className="new-hotels-input"
            value={hotelData.type}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="city">Thành phố:</label>
          <input
            id="city"
            name="city"
            type="text"
            className="new-hotels-input"
            value={hotelData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="address">Địa chỉ:</label>
          <input
            id="address"
            name="address"
            type="text"
            className="new-hotels-input"
            value={hotelData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="distance">Khoảng cách (tính từ trung tâm):</label>
          <input
            id="distance"
            name="distance"
            type="text"
            className="new-hotels-input"
            value={hotelData.distance}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="title">Tiêu đề:</label>
          <input
            id="title"
            name="title"
            type="text"
            className="new-hotels-input"
            value={hotelData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="desc">Mô tả:</label>
          <input
            id="desc"
            name="desc"
            type="text"
            className="new-hotels-input"
            value={hotelData.desc}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="rating">Đánh giá:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            className="new-hotels-input"
            value={hotelData.rating}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="cheapestPrice">Giá rẻ nhất:</label>
          <input
            id="cheapestPrice"
            name="cheapestPrice"
            type="number"
            className="new-hotels-input"
            value={hotelData.cheapestPrice}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label" htmlFor="photos">Hình ảnh:</label>
          <input
            id="photos"
            name="photos"
            type="file"
            className="new-hotels-input"
            onChange={handlePhotosChange}
            multiple
          />
        </div>

        <div className="new-hotels-group">
          <label className="new-hotels-label">
            Nổi bật:
            <input
              type="checkbox"
              className="new-hotels-checkbox"
              checked={hotelData.featured}
              onChange={handleFeaturedChange}
            />
          </label>
        </div>

        <button type="submit" className="new-hotels-submit-btn">Thêm khách sạn</button>
      </form>
    </div>
  );
};

export default NewHotels;
