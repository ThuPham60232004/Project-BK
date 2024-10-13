import React, { useState } from 'react';
import './NewNotification.css';
import axios from 'axios';

const NewNotification = () => {
  const [notificationData, setNotificationData] = useState({
    user: '',
    message: '',
    idAdmin: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNotificationData({ ...notificationData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/notifications', notificationData);
      alert('Thông báo đã được gửi thành công!');
      setNotificationData({
        user: '',
        message: '',
        idAdmin: '',
      });
    } catch (error) {
      console.error('Error details:', error);
      alert('Lỗi khi gửi thông báo.');
    }
  };
  

  return (
    <div className="notification-container">
      <form className="notification-form" onSubmit={handleFormSubmit}>
        <h2 className="notification-form-title">Thêm Thông Báo</h2>

        <div className="notification-form-group">
          <label htmlFor="user">ID Người Dùng:</label>
          <input
            id="user"
            name="user"
            type="text"
            className="notification-form-input"
            value={notificationData.user}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="notification-form-group">
          <label htmlFor="message">Nội Dung Thông Báo:</label>
          <textarea
            id="message"
            name="message"
            className="notification-form-input"
            value={notificationData.message}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="notification-form-group">
          <label htmlFor="idAdmin">ID Quản Trị Viên:</label>
          <input
            id="idAdmin"
            name="idAdmin"
            type="text"
            className="notification-form-input"
            value={notificationData.idAdmin}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="notification-form-submit-btn">Gửi Thông Báo</button>
      </form>
    </div>
  );
};

export default NewNotification;
