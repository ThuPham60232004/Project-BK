import React from "react";
import useFetch from "../../../hooks/useFetch";

const HotelList = ({ onSelectHotel }) => {
  const { data: hotels, loading, error } = useFetch("/api/hotels");

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi tải dữ liệu!</p>;

  return (
    <div className="hotelList">
      <h3>Chọn khách sạn</h3>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id} onClick={() => onSelectHotel(hotel._id)}>
            {hotel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
