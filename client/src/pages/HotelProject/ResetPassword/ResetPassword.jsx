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
        const response = await fetch(`http://localhost:9000/api/user/notifications/${userId}`);
        const data = await response.json();
        setNotifications(data);
        toast.success('Lấy thông báo thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông báo:', error);
      toast.error('Lỗi khi lấy thông báo');
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
      toast.success('Đánh dấu đã đọc thành công!');
    } catch (error) {
      console.error('Lỗi khi đánh dấu thông báo đã đọc:', error);
      toast.error('Lỗi khi đánh dấu thông báo đã đọc');
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await fetch(`http://localhost:9000/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });
      setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== notificationId));
      toast.success('Xóa thông báo thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa thông báo:', error);
      toast.error('Lỗi khi xóa thông báo');
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

  return (
    <div>
      <Navbar/>
      <br/> <br/> <br/> <br/> <br/>
      <div className="notifications-container">
        <h2>Thông Báo</h2>
        <ul>
          {notifications && notifications.map(notification => (
            <li key={notification._id} className={notification.isRead ? 'read' : ''}>
              <p className="message">{notification.message}</p>
              <p className="sent-at">Gửi lúc: {notification.createdAt}</p>
              {!notification.isRead && (
                <button onClick={() => markAsRead(notification._id)}>Đánh dấu đã đọc</button>
              )}
              <button onClick={() => deleteNotification(notification._id)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Notifications;
