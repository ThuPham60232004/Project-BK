import React, { useState, useEffect } from "react";
import './StatusBooking.css';

const StatusBooking = () => {
  const [bookingData, setBookingData] = useState([]);

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

  const renderSeat = (booking) => {
    let className = 'seat';

    if (booking.status === 'pending') className += ' pending';
    else if (booking.status === 'confirmed') className += ' confirmed';
    else if (booking.status === 'cancelled') className += ' cancelled';

    return (
      <div className={className} key={booking._id}>
        <div><strong>Hotel:</strong> {booking.hotel?.name || "Unknown Hotel"}</div>
        <div><strong>User:</strong> {booking.user?.username || "Unknown User"}</div>
        <div><strong>Room:</strong> {booking.room?.title || "Unknown Room"}</div>
        <div><strong>Status:</strong> {booking.status}</div>
      </div>
    );
  };

  return (
    <div className="seat-map">
      {bookingData.map(booking => renderSeat(booking))}
    </div>
  );
};

export default StatusBooking;
