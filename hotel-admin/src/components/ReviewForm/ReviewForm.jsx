import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewForm.css';

const HOTEL_API_URL = "http://localhost:9000/api/hotels/all/"; // URL để lấy danh sách khách sạn
const ROOM_API_URL = "http://localhost:9000/api/rooms/"; // URL để lấy danh sách phòng

const ReviewForm = ({ initialData = { rating: 0, comment: '', hotelId: '', roomId: '' }, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [comment, setComment] = useState(initialData?.comment || '');
  const [selectedHotel, setSelectedHotel] = useState(initialData?.hotelId || '');
  const [selectedRoom, setSelectedRoom] = useState(initialData?.roomId || '');
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${HOTEL_API_URL}`);
        setHotels(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách sạn", error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedHotel) {
        try {
          const response = await axios.get(`${ROOM_API_URL}?hotelId=${selectedHotel}`);
          setRooms(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phòng", error);
        }
      } else {
        setRooms([]);
      }
    };

    fetchRooms();
  }, [selectedHotel]);

  useEffect(() => {
    // Logic để cập nhật giá trị khi initialData thay đổi
    if (initialData) {
      setRating(initialData.rating || 0);
      setComment(initialData.comment || '');
      setSelectedHotel(initialData.hotelId || '');
      setSelectedRoom(initialData.roomId || '');
    }
  }, [initialData]);

  const handleRatingChange = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 5) {
      setRating(numericValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment, hotelId: selectedHotel, roomId: selectedRoom });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
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
        <label>Chọn khách sạn:</label>
        <select value={selectedHotel} onChange={(e) => setSelectedHotel(e.target.value)}>
          <option value="">Chọn khách sạn</option>
          {hotels.map(hotel => (
            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Chọn phòng:</label>
        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
          <option value="">Chọn phòng</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>{room.title}</option>
          ))}
        </select>
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-primary">Gửi</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Huỷ</button>
      </div>
    </form>
  );
};

export default ReviewForm;
