import React from "react";
import useFetch from "../../../hooks/useFetch";

const HotelList = ({ onSelectHotel }) => {
  const { data: hotels, loading, error } = useFetch("http://localhost:9000/api/hotels");

  if (loading) return <p>Đang tải khách sạn...</p>;
  if (error) return <p>Lỗi tải dữ liệu khách sạn</p>;

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
