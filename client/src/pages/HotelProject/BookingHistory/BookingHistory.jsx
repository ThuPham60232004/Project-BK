import React, { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../../../services/bookingService";
import { createReview } from "../../../services/reviewService";  // Import createReview
import Modal from "../../../components/HotelComponents/Modal/Modal";  
import ReviewForm from "../../../components/HotelComponents/ReviewForm/ReviewForm";  
import './BookingHistory.css';
import Navbar from "../../../components/HotelComponents/navbar/Navbar";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingHistory = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  const handleOpenReviewModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

 
  const handleReviewSubmit = async (reviewData) => {
    try {
      const reviewPayload = {
        ...reviewData,
        userId,
        bookingId: selectedBooking._id,
        hotelId: selectedBooking.hotel._id,
        roomId:selectedBooking.room._id
      };

      await createReview(reviewPayload);  
      toast.success('Đánh giá của bạn đã được gửi thành công!');
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá", error);
      toast.error('Có lỗi xảy ra khi gửi đánh giá.');
    } finally {
      setModalOpen(false);
    }
  };

  const canCancelBooking = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const timeDifference = now - createdTime; 
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference <= 24;
  };

  if (!userId) {
    return <p>Vui lòng đăng nhập để xem lịch sử đặt phòng.</p>;
  }

  return (
    <div>
      <Navbar />
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
                <p>Phương thức thanh toán: {booking.paymentMethod}</p>
                <p>Ngày tạo: {new Date(booking.createdAt).toLocaleString()}</p>
              </div>

              <div className="two_button">
                <button 
                  className="cancelButton" 
                  onClick={() => handleCancelBooking(booking._id)} 
                  disabled={!canCancelBooking(booking.createdAt) || booking.status === "cancelled"}
                >
                  Hủy phòng
                </button>
                {booking.status === 'cancelled' && (
                  <button 
                    className="reviewButton" 
                    onClick={() => handleOpenReviewModal(booking)}
                  >
                    Đánh giá
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {selectedBooking && (
          <ReviewForm
            initialData={{
              hotelName: selectedBooking.hotel.name,
              roomTitle: selectedBooking.room.title
            }}
            onSubmit={handleReviewSubmit}
            onCancel={() => setModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default BookingHistory;
