import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleBooking.css';

const SingleBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/bookings/${id}`);
        setBooking(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [id]);

  const handleEdit = () => {
    setEditData(booking);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/bookings/${id}`, editData);
      setBooking(editData);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className='loading'>Loading...</div>;
  if (!booking) return <div className='no-booking'>No booking found.</div>;

  return (
    <div className='SingleBooking'>
      <h2>Chi tiết đơn đặt phòng</h2>
      <div className='BookingDetail'>
        <p><strong>Id người dùng:</strong> {booking.user?._id}</p>
        <p><strong>Id khách sạn:</strong> {booking.hotel?._id}</p>
        <p><strong>Id phòng:</strong> {booking.room?._id}</p>
        <p><strong>Ngày bắt đầu:</strong> {booking.startDate}</p>
        <p><strong>Ngày kết thúc:</strong> {booking.endDate}</p>
        <p><strong>Phương thức thanh toán:</strong> {booking.paymentMethod}</p>
        <p><strong>Trạng thái:</strong> {booking.status}</p>
        <p><strong>Tổng giá:</strong> {booking.totalPrice}</p>
        <p><strong>Thời gian checkin:</strong> {booking.checkintime}</p>
        <p><strong>Tiền cọc:</strong> {booking.hotel_deposit}</p>
        <p><strong>Id quản lý khách sạn:</strong> {booking.idAdmin}</p>
        <button onClick={handleEdit} className="edit-button">Chỉnh sửa</button>
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h3>Chỉnh sửa đơn đặt phòng</h3>
              <label>
                Ngày bắt đầu:
                <input
                  type="date"
                  name="startDate"
                  value={editData.startDate}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ngày kết thúc:
                <input
                  type="date"
                  name="endDate"
                  value={editData.endDate}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phương thức thanh toán:
                <input
                  type="text"
                  name="paymentMethod"
                  value={editData.paymentMethod}
                  onChange={handleChange}
                />
              </label>
              <label>
                Trạng thái:
                <input
                  type="text"
                  name="status"
                  value={editData.status}
                  onChange={handleChange}
                />
              </label>
              <label>
                Tổng giá:
                <input
                  type="number"
                  name="totalPrice"
                  value={editData.totalPrice}
                  onChange={handleChange}
                />
              </label>
              <label>
                Thời gian checkin:
                <input
                  type="text"
                  name="checkintime"
                  value={editData.checkintime}
                  onChange={handleChange}
                />
              </label>
              <label>
                Tiền cọc:
                <input
                  type="number"
                  name="hotel_deposit"
                  value={editData.hotel_deposit}
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="submit-button">Lưu thay đổi</button>
              <button type="button" onClick={() => setIsEditing(false)} className="close-button">Đóng</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBooking;
