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
  const [discountCodes, setDiscountCodes] = useState([]);
  const [discountCodes2, setDiscountCodes2] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/hotels/room/${id}`);
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDiscountCodes = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/discounts');
        setDiscountCodes(response.data.slice(0, 3));
      } catch (error) {
        console.error('Lỗi tải dữ liệu mã giảm giá:', error);
      }
    };
    const fetchDiscountCodes2 = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/discounts');
        setDiscountCodes2(response.data.slice(3, 6));
      } catch (error) {
        console.error('Lỗi tải dữ liệu mã giảm giá:', error);
      }
    };

    fetchDiscountCodes2();
    fetchRooms();
    fetchDiscountCodes();
  }, [id]);

  if (rooms.length === 0) return <div>Đang tải...</div>;

  const handleReserveClick = (room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };

  const getDiscountTypeLabel = (type) => {
    if (type === 'fixed') return 'VNĐ';
    if (type === 'percentage') return '%';
    return type;
  };

  return (
    <div>
      <Navbar />
      <div className="room-detail-container">
      <div className="discount-section11">
        <h2>Mã giảm giá gợi ý</h2>
        <ul className="discount-list11">
          {discountCodes.map(discount => (
            <li key={discount._id} className="discount-item11">    
            <div>
                <p className="discount-value11">{discount.code}</p>
              </div>          
            <div className="discount-info11">
              <p>Số lượng mã: {discount.amountDiscountCode}</p>
              <p>Ngày bắt đầu: {new Date(discount.startDate).toLocaleDateString()}</p>
              <p>HSD: {new Date(discount.expirationDate).toLocaleDateString()}</p>
          </div>
          </li>
          ))}
        </ul>
      </div>
      
      <div className="room-section">
        <div className="room-detail">
          {rooms
            .filter(room => room.availability === false || room.availability === undefined)
            .map((room) => (
              <div key={room._id} className="room">
                <img src={room.images[0]} alt={`Room ${room.title}`} className="room-image" />
                <div className="room-info">
                  <h1 className="room-title">{room.title}</h1>
                  <p className="room-desc">{room.desc}</p>
                  <p className="room-price">
                    Giá: {room.price.toLocaleString('vi-VN')} VNĐ
                  </p>
                  {room.discountPrice && (
                    <p className="room-discount">
                      Giá giảm: {room.discountPrice.toLocaleString('vi-VN')} VNĐ
                    </p>
                  )}
                  {room.taxPrice && (
                    <p className="room-tax">
                      Giá thuế: {room.taxPrice.toLocaleString('vi-VN')} VNĐ
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

      <div className="discount-section11">
        <h2>Mã giảm giá gợi ý</h2>
        <ul className="discount-list11">
          {discountCodes2.map(discount => (
            <li key={discount._id} className="discount-item11">
              <div>
                <p className="discount-value11">{discount.code}</p>
              </div>              
              <div className="discount-info11">
                <p>Số lượng mã: {discount.amountDiscountCode}</p>
                <p>Ngày bắt đầu: {new Date(discount.startDate).toLocaleDateString()}</p>
                <p>HSD: {new Date(discount.expirationDate).toLocaleDateString()}</p>
            </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    </div>
  );
};

export default RoomDetail;
