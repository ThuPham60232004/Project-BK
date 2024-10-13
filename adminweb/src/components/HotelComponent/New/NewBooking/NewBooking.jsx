import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewBooking.css';

const NewBooking = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    paymentMethod: ''
  });
  const [numberOfBookingDays, setNumberOfBookingDays] = useState(0);
  const [discountAmountState, setDiscountAmountState] = useState(0);
  const [totalPriceDetails, setTotalPriceDetails] = useState({});

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/hotels/all');
        setHotels(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedHotel) {
        try {
          const res = await axios.get(`http://localhost:9000/api/hotels/room/${selectedHotel}`);
          setRooms(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setRooms([]); 
      }
    };
    fetchRooms();
  }, [selectedHotel]);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = (end - start) / (1000 * 60 * 60 * 24);
      setNumberOfBookingDays(days >= 0 ? days : 0);
    } else {
      setNumberOfBookingDays(0);
    }
  }, [formData.startDate, formData.endDate]);

  useEffect(() => {
    setTotalPriceDetails(calculateTotalPriceDetails());
  }, [selectedRoom, numberOfBookingDays, discountAmountState, formData.startDate, formData.endDate]);

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
    setSelectedRoom(null);
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const calculateTotalPriceDetails = () => {
    if (!selectedRoom) return { totalPriceBeforeTax: 0, totalTax: 0, discountAmount: 0, finalTotalPrice: 0, depositAmount: 0 };

    let totalPriceBeforeTax = 0;
    let totalTax = 0;

    const room = rooms.find(r => r._id === selectedRoom);

    const discountPrice = room.discountPrice || room.price; 
    const roomTotalBeforeTax = discountPrice * numberOfBookingDays;
    totalPriceBeforeTax += roomTotalBeforeTax;

    const totalPriceAfterDiscount = totalPriceBeforeTax; 
    const taxRate = room.taxPrice || 0; 
    totalTax = taxRate; 

    const finalTotalPrice = totalPriceAfterDiscount + totalTax; 

    const depositAmount = finalTotalPrice * 0.10; 

    return {
      totalPriceBeforeTax,
      totalTax,
      discountAmount: discountAmountState,
      depositAmount,
      finalTotalPrice
    };
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    const bookingData = {
      user: formData.user,
      hotel: selectedHotel,
      room: selectedRoom,
      startDate: formData.startDate,
      endDate: formData.endDate,
      paymentMethod: formData.paymentMethod,
      totalPrice: totalPriceDetails.finalTotalPrice,
      hotel_deposit: totalPriceDetails.depositAmount,
      checkintime: new Date(), 
    };

    try {
      await axios.post('http://localhost:9000/api/bookings', bookingData);
      alert("Đặt phòng thành công!");
    } catch (error) {
      console.error("Lỗi khi đặt phòng:", error);
      alert("Đặt phòng không thành công!");
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };

  return (
    <div className="booking-container">
      <div className="hotel-list">
        <h2 className="hotel-list-title">Danh sách khách sạn</h2>
        <select className="hotel-select" onChange={handleHotelChange} value={selectedHotel || ''}>
          <option value="">-- Chọn khách sạn --</option>
          {hotels.map(hotel => (
            <option key={hotel._id} value={hotel._id}>
              {hotel.name} - {hotel.city}
            </option>
          ))}
        </select>
      </div>

      <div className="room-list">
        <h2 className="room-list-title">Danh sách phòng</h2>
        <select className="room-select" onChange={handleRoomChange} value={selectedRoom || ''} disabled={!selectedHotel}>
          <option value="">-- Chọn phòng --</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>
              {room.title} - Giá: {formatCurrency(room.price)}
            </option>
          ))}
        </select>
      </div>

      {selectedRoom && (
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <input 
            className="user-id-input"
            type="text" 
            name="user" 
            placeholder="ID người dùng" 
            value={formData.user} 
            onChange={handleInputChange} 
            required 
          />
          <div className="date-inputs">
            <label className="date-label">Bắt đầu từ:</label>
            <input 
              className="date-input"
              type="date" 
              value={formData.startDate} 
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required 
            />
          </div>
          <div className="date-inputs">
            <label className="date-label">Đến ngày:</label>
            <input 
              className="date-input"
              type="date" 
              value={formData.endDate} 
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required 
            />
          </div>
          <div className="payment-method">
            <label className="payment-label">Phương thức thanh toán:</label>
            <select 
              className="payment-select"
              value={formData.paymentMethod} 
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              required
            >
              <option value="">-- Chọn phương thức thanh toán --</option>
              <option value="vnpay">VNPAY</option>
              <option value="moca">MoCa</option>
              <option value="webmoney">WebMoney</option>
              <option value="paypal">PayPal</option>
              <option value="Mastercard">MasterCard</option>
              <option value="Visa">Visa</option>
            </select>
          </div>
          <div className="price-details">
            <h3 className="price-details-title">Thông tin đặt phòng</h3>
            <p className="price-detail">Tổng giá trước thuế: {formatCurrency(totalPriceDetails.totalPriceBeforeTax)}</p>
            <p className="price-detail">Tiền thuế: {formatCurrency(totalPriceDetails.totalTax)}</p>
            <p className="price-detail">Số tiền đặt cọc: {formatCurrency(totalPriceDetails.depositAmount)}</p>
            <p className="price-detail">Tổng giá tiền: {formatCurrency(totalPriceDetails.finalTotalPrice)}</p>
          </div>
          <button className="booking-button" type="submit">Đặt phòng</button>
        </form>
      )}
    </div>
  );
};

export default NewBooking;
