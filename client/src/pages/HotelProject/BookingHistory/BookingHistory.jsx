import React, { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../../../services/bookingService";
import "./BookingHistory.css";
import Navbar from "../../../components/HotelComponents/navbar/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingHistory = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getUserBookings(userId);
        setBookings(data);
        toast.success('Đã tải lịch sử đặt phòng thành công!');
      } catch (error) {
        console.error("Không Lấy Được Dữ Liệu Đặt Phòng", error);
        toast.error('Có lỗi xảy ra khi tải lịch sử đặt phòng.');
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const updatedBooking = await cancelBooking(bookingId);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? updatedBooking : booking
        )
      );
      toast.success('Đã hủy đặt phòng thành công!');
    } catch (error) {
      console.error("Không thể hủy đặt chỗ", error);
      toast.error('Có lỗi xảy ra khi hủy đặt phòng.');
    }
  };

  if (!userId) {
    return <p>Vui lòng đăng nhập để xem lịch sử đặt phòng.</p>;
  }

  return (
    <div>
      <Navbar/>
      <br/> <br/> <br/> <br/> <br/>
      <div className="bookingHistory">
        <h2>Lịch sử đặt phòng</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="bookingItem">
              <div className="bookingDetails">
                <h3>{booking.hotel ? booking.hotel.name : 'N/A'}</h3>
                <p>Địa chỉ: {booking.hotel ? booking.hotel.address : 'N/A'}</p>
                <p>Phòng: {booking.room ? booking.room.title : 'N/A'}</p> 
                <p>Ngày bắt đầu: {new Date(booking.startDate).toLocaleDateString()}</p>
                <p>Ngày kết thúc: {new Date(booking.endDate).toLocaleDateString()}</p>
                <p>Trạng thái: {booking.status}</p>
                <p>Tổng giá: {booking.totalPrice.toLocaleString()} VND</p> 
                <p>Phương thức thanh toán:{booking.paymentMethod}</p>
              </div>
              <button 
                className="cancelButton" 
                onClick={() => handleCancelBooking(booking._id)} 
                disabled={booking.status === "cancelled"}
              >
                Hủy phòng
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingHistory;
