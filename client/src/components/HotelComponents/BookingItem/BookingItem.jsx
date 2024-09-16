import React from "react";

const BookingItem = ({ booking, onCancel }) => {
  return (
    <li>
      <p>Khách sạn: {booking.hotel.name}</p>
      <p>Phòng: {booking.room.map(room => room.title).join(", ")}</p>
      <p>Ngày bắt đầu: {new Date(booking.startDate).toLocaleDateString()}</p>
      <p>Ngày kết thúc: {new Date(booking.endDate).toLocaleDateString()}</p>
      <p>Trạng thái: {booking.status}</p>
      {booking.status !== "cancelled" && (
        <button onClick={() => onCancel(booking._id)}>Huỷ Đặt Phòng</button>
      )}
    </li>
  );
};

export default BookingItem;
