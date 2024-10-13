import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import './StatusBooking.css';

Modal.setAppElement('#root'); 

const StatusBooking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/bookings/");
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookings();
  }, []);

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
        <div><strong>Tên khách sạn:</strong> {booking.hotel?.name || "Unknown Hotel"}</div>
        <div><strong>Tên người dùng:</strong> {booking.user?.username || "Unknown User"}</div>
        <div><strong>Tên phòng:</strong> {booking.room?.title || "Unknown Room"}</div>
        <div><strong>Trạng thái đơn đặt phòng:</strong> {booking.status}</div>
      </div>
    );
  };

  return (
    <div className="seat-map">
      {bookingData.map(booking => renderSeat(booking))}

      {selectedBooking && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Booking Details"
          className="booking-modal"
          overlayClassName="booking-modal-overlay"
        >
          <h2>Cập nhâp trạng thái đơn đặt phòng</h2>
          <div><strong>Tên khách sạn:</strong> {selectedBooking.hotel?.name || "Unknown Hotel"}</div>
          <div><strong>Tên người dùng:</strong> {selectedBooking.user?.username || "Unknown User"}</div>
          <div><strong>Tên phòng:</strong> {selectedBooking.room?.title || "Unknown Room"}</div>
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
          <button className='btnhh' onClick={handleStatusChange}>Update Status</button>
          <button className='bthhh' onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default StatusBooking;
