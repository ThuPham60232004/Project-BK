import React, { useState, useEffect } from 'react';
import './NewReview.css';
import axios from 'axios';

const NewReview = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [reviewData, setReviewData] = useState({
    userId: '',
    hotelId: '',
    roomId: '',
    rating: 0,
    comment: '',
    idAdmin: '',
  });

  const handleHotelChange = (event) => {
    const hotelId = event.target.value;
    setSelectedHotel(hotelId);
    setReviewData({ ...reviewData, hotelId });
    setSelectedRoom(null);
  };

  const handleRoomChange = (event) => {
    const roomId = event.target.value;
    setSelectedRoom(roomId);
    setReviewData({ ...reviewData, roomId });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/reviews/', reviewData);
      alert('Đã thêm bình luận thành công!');
    } catch (err) {
      console.error(err);
      alert('Lỗi khi thêm bình luận.');
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/hotels/all');
        setHotels(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedHotel) {
        try {
          const res = await axios.get(`http://localhost:9000/api/hotels/room/${selectedHotel}`);
          setRooms(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setRooms([]);
      }
    };
    fetchRooms();
  }, [selectedHotel]);

  return (
    <div className="new-review-container">
      <form className="review-form" onSubmit={handleFormSubmit}>
        <h2 className="review-form-title">Thêm Bình Luận</h2>

        <div className="hotel-list">
          <label htmlFor="hotel">Chọn khách sạn:</label>
          <select
            id="hotel"
            className="hotel-select"
            onChange={handleHotelChange}
            value={selectedHotel || ''}
          >
            <option value="">-- Chọn khách sạn --</option>
            {hotels.map(hotel => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.name} - {hotel.city}
              </option>
            ))}
          </select>
        </div>

        <div className="room-list">
          <label htmlFor="room">Chọn phòng:</label>
          <select
            id="room"
            className="room-select"
            onChange={handleRoomChange}
            value={selectedRoom || ''}
            disabled={!selectedHotel}
          >
            <option value="">-- Chọn phòng --</option>
            {rooms.map(room => (
              <option key={room._id} value={room._id}>
                {room.title}
              </option>
            ))}
          </select>
        </div>

        <div className="review-form-group">
          <label htmlFor="rating">Đánh Giá:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            value={reviewData.rating}
            onChange={handleInputChange}
            required
            className="review-form-input"
          />
        </div>

        <div className="review-form-group">
          <label htmlFor="comment">Bình Luận:</label>
          <textarea
            id="comment"
            name="comment"
            value={reviewData.comment}
            onChange={handleInputChange}
            className="review-form-input"
          />
        </div>

        <button type="submit" className="review-form-submit-btn">Thêm Bình Luận</button>
      </form>
    </div>
  );
};

export default NewReview;
