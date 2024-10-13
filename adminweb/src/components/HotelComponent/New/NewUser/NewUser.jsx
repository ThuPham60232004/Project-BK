import React, { useState } from 'react';
import './NewUser.css';
import axios from 'axios';

const NewUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    city: '',
    phone: '',
    cccd: '',
    passportNumber: '',
    passengerName: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/auth/register', userData);
      alert('Người dùng đã được tạo thành công!');
      // Reset form after submission
      setUserData({
        username: '',
        email: '',
        password: '',
        country: '',
        city: '',
        phone: '',
        cccd: '',
        passportNumber: '',
        passengerName: '',
      });
    } catch (error) {
      console.error(error);
      alert('Lỗi khi thêm người dùng.');
    }
  };

  return (
    <div className="new-user-container">
      <form className="user-form" onSubmit={handleFormSubmit}>
        <h2 className="user-form-title">Thêm Người Dùng Mới</h2>

        <div className="user-form-group">
          <label htmlFor="username">Tên Người Dùng:</label>
          <input
            id="username"
            name="username"
            type="text"
            className="user-form-input"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="user-form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            className="user-form-input"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="user-form-group">
          <label htmlFor="password">Mật Khẩu:</label>
          <input
            id="password"
            name="password"
            type="password"
            className="user-form-input"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="user-form-group">
          <label htmlFor="country">Quốc Gia:</label>
          <input
            id="country"
            name="country"
            type="text"
            className="user-form-input"
            value={userData.country}
            onChange={handleInputChange}
          />
        </div>

        <div className="user-form-group">
          <label htmlFor="city">Thành Phố:</label>
          <input
            id="city"
            name="city"
            type="text"
            className="user-form-input"
            value={userData.city}
            onChange={handleInputChange}
          />
        </div>

        <div className="user-form-group">
          <label htmlFor="phone">Số Điện Thoại:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="user-form-input"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="user-form-group">
          <label htmlFor="cccd">CCCD:</label>
          <input
            id="cccd"
            name="cccd"
            type="text"
            className="user-form-input"
            value={userData.cccd}
            onChange={handleInputChange}
          />
        </div>

        <div className="user-form-group">
          <label htmlFor="passportNumber">Số Hộ Chiếu:</label>
          <input
            id="passportNumber"
            name="passportNumber"
            type="text"
            className="user-form-input"
            value={userData.passportNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="user-form-group">
          <label htmlFor="passengerName">Tên chủ sổ hộ chiếu:</label>
          <input
            id="passengerName"
            name="passengerName"
            type="text"
            className="user-form-input"
            value={userData.passengerName}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="user-form-submit-btn">Thêm Người Dùng</button>
      </form>
    </div>
  );
};

export default NewUser;
