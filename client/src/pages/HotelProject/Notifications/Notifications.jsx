import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Notifications.css";
import Navbar from "../../../components/HotelComponents/navbar/Navbar";

const Notifications = () => {
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      if (userId) {
        const response = await fetch(`http://localhost:9000/api/notifications/user/${userId}`);
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      toast.error('Lỗi khi lấy thông báo');
      console.error('Lỗi khi lấy thông báo:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://localhost:9000/api/notifications/${notificationId}/read`, {
        method: 'PUT',
      });
      setNotifications(prevNotifications => prevNotifications.map(notification => {
        if (notification._id === notificationId) {
          return { ...notification, isRead: true };
        }
        return notification;
      }));
      toast.success('Thông báo đã được đánh dấu là đã đọc');
    } catch (error) {
      toast.error('Lỗi khi đánh dấu thông báo là đã đọc');
      console.error('Lỗi khi đánh dấu thông báo là đã đọc:', error);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const handleNotificationClick = (notificationId) => {
    if (!notifications.find(notification => notification._id === notificationId).isRead) {
      markAsRead(notificationId);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <br /><br /><br /><br /><br />
      <div className="notifications-container">
        <h2>Thông Báo</h2>
        <ul>
          {notifications && notifications.map(notification => (
            <li
              key={notification._id}
              className={notification.isRead ? 'read' : ''}
              onClick={() => handleNotificationClick(notification._id)}
            >
              <p className="message">{notification.message}</p>
              <p className="sent-at">Gửi từ: {notification.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
