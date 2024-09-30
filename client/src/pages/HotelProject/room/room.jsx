import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './room.css'; 
import Reserve from '../../../components/HotelComponents/reserve/Reserve';
import Navbar from '../../../components/HotelComponents/navbar/Navbar';

const RoomDetail = () => {
  const { id } = useParams(); 
  const [rooms, setRooms] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/hotels/room/${id}`);
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, [id]);

  if (rooms.length === 0) return <div>Đang tải...</div>;

  const handleReserveClick = (room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };

  return (
    <div>
      <Navbar />
      <div className="room-detail">
    {rooms
      .filter(room => room.availability === false || room.availability === undefined)  // Hiển thị phòng chưa được đặt hoặc không có thuộc tính availability
      .map((room) => (
        <div key={room._id} className="room">
          <img src={room.images[0]} alt={`Room ${room.title}`} className="room-image" />
          <div className="room-info">
            <h1 className="room-title">{room.title}</h1>
            <p className="room-desc">{room.desc}</p>
            <p className="room-price">
              Price: {room.price.toLocaleString('vi-VN')} VNĐ
            </p>
            {room.discountPrice && (
              <p className="room-discount">
                Discount Price: {room.discountPrice.toLocaleString('vi-VN')} VNĐ
              </p>
            )}
            {room.taxPrice && (
              <p className="room-tax">
                Tax Price: {room.taxPrice.toLocaleString('vi-VN')} VNĐ
              </p>
            )}
            <p className="room-max">Tổng số người: {room.maxPeople}</p>
            <button className="reserve-button" onClick={() => handleReserveClick(room)}>
              Đặt Phòng
            </button>
          </div>
        </div>
      ))}
    {openModal && selectedRoom && (
      <Reserve setOpen={setOpenModal} hotelId={id} roomId={selectedRoom._id} />
    )}
  </div>
    </div>
  );
};

export default RoomDetail;
