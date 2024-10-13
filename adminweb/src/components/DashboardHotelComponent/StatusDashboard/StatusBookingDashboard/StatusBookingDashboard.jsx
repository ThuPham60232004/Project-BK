import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import './StatusBookingDashboard.css';

Modal.setAppElement('#root'); 

const StatusBookingDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [selectedHotelId, setSelectedHotelId] = useState('');
  const storedIdAdmin = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/hotels/hotelAdmin/${storedIdAdmin}`);
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, [storedIdAdmin]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (selectedHotelId) {
        try {
          const response = await fetch(`http://localhost:9000/api/bookings/getbyhotel/${selectedHotelId}`);
          const data = await response.json();
          setBookingData(data);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      }
    };

    fetchBookings();
  }, [selectedHotelId]);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleStatusChange = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/bookings/${selectedBooking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        const updatedBooking = await response.json();
        setBookingData((prevData) =>
          prevData.map((booking) =>
            booking._id === updatedBooking._id ? updatedBooking : booking
          )
        );
        closeModal(); 
      } else {
        console.error("Error updating booking status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderSeat = (booking) => {
    let className = 'seat';

    if (booking.status === 'pending') className += ' pending';
    else if (booking.status === 'confirmed') className += ' confirmed';
    else if (booking.status === 'cancelled') className += ' cancelled';

    return (
      <div className={className} key={booking._id} onClick={() => openModal(booking)}>
        <div><strong>Tên khách sạn:</strong> {booking.hotel}</div>
        <div><strong>Tên người dùng:</strong> {booking.user}</div>
        <div><strong>Tên phòng:</strong> {booking.room}</div>
        <div><strong>Trạng thái đơn đặt phòng:</strong> {booking.status}</div>
      </div>
    );
  };

  return (
    <div className="seat-map">
      <h2>Chọn khách sạn để xem trạng thái đặt phòng</h2>
      <select onChange={(e) => setSelectedHotelId(e.target.value)} value={selectedHotelId}>
        <option value="">Chọn khách sạn</option>
        {hotels.map(hotel => (
          <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
        ))}
      </select>

      {bookingData.map(booking => renderSeat(booking))}

      {selectedBooking && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Booking Details"
          className="booking-modal"
          overlayClassName="booking-modal-overlay"
        >
          <h2>Cập nhật trạng thái đơn đặt phòng</h2>
          <div><strong>Tên khách sạn:</strong> {selectedBooking.hotel}</div>
          <div><strong>Tên người dùng:</strong> {selectedBooking.user}</div>
          <div><strong>Tên phòng:</strong> {selectedBooking.room}</div>
          <div>
            <label htmlFor="status"><strong>Trạng thái đơn đặt phòng:</strong></label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button className='btnhh' onClick={handleStatusChange}>Cập nhật trạng thái</button>
          <button className='bthhh' onClick={closeModal}>Đóng</button>
        </Modal>
      )}
    </div>
  );
};

export default StatusBookingDashboard;
