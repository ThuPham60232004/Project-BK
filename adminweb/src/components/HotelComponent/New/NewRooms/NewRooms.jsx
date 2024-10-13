import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewRooms.css';

const NewRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomData, setRoomData] = useState({
    title: '',
    desc: '',
    price: '',
    discountPrice: '',
    taxPrice: '',
    maxPeople: '',
    category: '',
    images: [],
  });

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:9000/api/rooms/${selectedHotel}`, roomData);
      alert('Thêm phòng thành công!');
    } catch (err) {
      console.error(err);
      alert('Lỗi khi thêm phòng.');
    }
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
    setRoomData({ ...roomData, images: imageArray });
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

  return (
    <div className="new-rooms-container">
      <div className="hotel-selection">
        <h2 className="hotel-selection-title">Chọn khách sạn</h2>
        <select
          className="hotel-selection-dropdown"
          onChange={handleHotelChange}
          value={selectedHotel || ''}
        >
          <option value="">-- Chọn khách sạn --</option>
          {hotels.map((hotel) => (
            <option key={hotel._id} value={hotel._id}>
              {hotel.name} - {hotel.city}
            </option>
          ))}
        </select>
      </div>

      <form className="room-form" onSubmit={handleFormSubmit}>
        <h2 className="room-form-title">Thêm phòng mới</h2>

        <div className="room-form-group">
          <label className="room-form-label" htmlFor="title">Tiêu đề:</label>
          <input
            id="title"
            name="title"
            type="text"
            className="room-form-input"
            value={roomData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="room-form-group">
          <label className="room-form-label" htmlFor="desc">Mô tả:</label>
          <input
            id="desc"
            name="desc"
            type="text"
            className="room-form-input"
            value={roomData.desc}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="room-form-group">
          <label className="room-form-label" htmlFor="price">Giá:</label>
          <input
            id="price"
            name="price"
            type="number"
            className="room-form-input"
            value={roomData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="room-form-group">
          <label className="room-form-label" htmlFor="discountPrice">Giá giảm:</label>
          <input
            id="discountPrice"
            name="discountPrice"
            type="number"
            className="room-form-input"
            value={roomData.discountPrice}
            onChange={handleInputChange}
          />
        </div>

        <div className="room-form-group">
          <label className="room-form-label" htmlFor="taxPrice">Tiền thuế:</label>
          <input
            id="taxPrice"
            name="taxPrice"
            type="number"
            className="room-form-input"
            value={roomData.taxPrice}
            onChange={handleInputChange}
          />
        </div>

        <div className="room-form-group">
          <label className="room-form-label" htmlFor="maxPeople">Số người tối đa:</label>
          <input
            id="maxPeople"
            name="maxPeople"
            type="number"
            className="room-form-input"
            value={roomData.maxPeople}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="room-form-group">
          <label className="room-form-label" htmlFor="images">Hình ảnh:</label>
          <input
            id="images"
            name="images"
            type="file"
            className="room-form-input"
            multiple
            onChange={handleImageUpload}
          />
          <div className="image-preview">
            {roomData.images.map((image, index) => (
              <img key={index} src={image} alt={`Room Image ${index + 1}`} className="room-image" />
            ))}
          </div>
        </div>

        <div className="room-form-group">
          <label className="room-form-label" htmlFor="category">Loại phòng:</label>
          <select
            id="category"
            name="category"
            className="room-form-dropdown"
            value={roomData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Chọn loại phòng --</option>
            <option value="Phòng Hạng Sang">Phòng Hạng Sang</option>
            <option value="Phòng Tổng Thống">Phòng Tổng Thống</option>
            <option value="Phòng Thường">Phòng Thường</option>
          </select>
        </div>

        <button type="submit" className="room-form-submit-btn">Thêm phòng</button>
      </form>
    </div>
  );
};

export default NewRooms;
