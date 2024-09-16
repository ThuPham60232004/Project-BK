import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Modal.css'; // Import the CSS file

const BookingModal = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [meals, setMeals] = useState([]);
  const [luggageFees, setLuggageFees] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountData, setDiscountData] = useState(null);
  const [selectedMealId, setSelectedMealId] = useState('');
  const [selectedLuggageFeeId, setSelectedLuggageFeeId] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const res = await axios.get(`http://localhost:9000/api/users/${userId}`);
          setUserInfo(res.data);
        } catch (err) {
          console.error('Không thể lấy thông tin người dùng', err);
        }
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/Meals/getMeals');
        setMeals(res.data);
      } catch (err) {
        console.error('Không thể lấy thông tin món ăn', err);
      }
    };
    fetchMeals();
  }, []);

  useEffect(() => {
    const fetchLuggageFees = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/LuggageFee/getLuggageFees');
        setLuggageFees(res.data);
      } catch (err) {
        console.error('Không thể lấy thông tin phí hành lý', err);
      }
    };
    fetchLuggageFees();
  }, []);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/Tickets/getTicket/${id}`);
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu vé:', error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        await axios.put(`http://localhost:9000/api/users/${userId}`, userInfo);
        alert('Cập nhật thông tin người dùng thành công');
      }
    } catch (err) {
      console.error('Không thể cập nhật thông tin người dùng', err);
    }
  };

  const handleApplyDiscount = async () => {
    try {
      const res = await axios.post(
        'http://localhost:9000/api/DiscountCodesAirplane/applyDiscountCodeAirplane',
        { code: discountCode }
      );
      const data = res.data;
  
      if (data.success) {
        setDiscountData(data);
        alert('Mã giảm giá đã được áp dụng thành công');
      } else {
        alert(data.message || 'Mã giảm giá không hợp lệ hoặc đã hết hạn');
      }
    } catch (err) {
      console.error('Không thể áp dụng mã giảm giá', err);
      alert('Đã xảy ra lỗi khi áp dụng mã giảm giá. Vui lòng thử lại.');
    }
  };

  const handleBookTicket = async () => {
    const userId = localStorage.getItem('userId');
    const bookingData = {
      userId,
      flightId: ticket.flightId._id,
      seatId: ticket.seatId._id,
      passengerName: userInfo.passengerName,
      passportNumber: userInfo.passportNumber,
      bookingDate: new Date(),
      totalAmount: ticket.price - (discountData?.discountAmount || ticket.discountPrice || 0) + ticket.taxPrice,
      paymentStatus: "Pending",
      mealId: selectedMealId,
      luggageFeeId: selectedLuggageFeeId,
      idAdmin: ""
    };
    
    try {
      await axios.post('http://localhost:9000/api/BookingTicket', bookingData);
      alert('Đặt vé thành công');
      navigate('/homeairplane');
    } catch (err) {
      console.error('Không thể đặt vé', err);
      alert('Đã xảy ra lỗi khi đặt vé. Vui lòng thử lại.');
    }
  };

  const handleCloseModal = () => {
    navigate(-1);
  };

  const calculateTotal = () => {
    const ticketPrice = ticket?.price || 0;
    const discountAmount = discountData?.discountAmount + ticket?.discountPrice || 0;
    const taxPrice = ticket?.taxPrice || 0;
    
    // Giá món ăn đã chọn (nếu có)
    const selectedMeal = meals.find(meal => meal._id === selectedMealId);
    const selectedMealPrice = selectedMeal ? selectedMeal.price : 0;
  
    // Phí hành lý đã chọn (nếu có)
    const selectedLuggage = luggageFees.find(luggage => luggage._id === selectedLuggageFeeId);
    const selectedLuggageFee = selectedLuggage ? selectedLuggage.fee : 0;
  
    // Tổng tiền
    const totalAmount = (ticketPrice - discountAmount + taxPrice + selectedMealPrice + selectedLuggageFee);
  
    return totalAmount.toLocaleString('vi-VN');
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={handleCloseModal}>×</button>
        <h1>Xác nhận đặt vé</h1>

        {userInfo ? (
          <div className="user-info">
            <h2>Thông tin người dùng</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Tên đăng nhập:
                <input type="text" name="username" value={userInfo.username} onChange={handleInputChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
              </label>
              <label>
                Quốc gia:
                <input type="text" name="country" value={userInfo.country} onChange={handleInputChange} />
              </label>
              <label>
                Thành phố:
                <input type="text" name="city" value={userInfo.city} onChange={handleInputChange} />
              </label>
              <label>
                Điện thoại:
                <input type="text" name="phone" value={userInfo.phone} onChange={handleInputChange} />
              </label>
              <label>
                CCCD:
                <input type="text" name="CCCD" value={userInfo.CCCD} onChange={handleInputChange} />
              </label>
              <label>
                Số hộ chiếu:
                <input type="text" name="passportNumber" value={userInfo.passportNumber} onChange={handleInputChange} />
              </label>
              <label>
                Tên hành khách:
                <input type="text" name="passengerName" value={userInfo.passengerName} onChange={handleInputChange} />
              </label>
              <button type="submit" className="confirm-btn">Cập nhật thông tin</button>
            </form>
          </div>
        ) : (
          <p>Đang tải thông tin người dùng...</p>
        )}

        <h2>Các món ăn có sẵn</h2>
        <div className="meals-container">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <div
                key={meal._id}
                className={`meal-card ${selectedMealId === meal._id ? 'selected' : ''}`}
                onClick={() => setSelectedMealId(meal._id)}
              >
                <h3>{meal.name}</h3>
                <img src={meal.imageUrl} alt={meal.name} />
                <p>{meal.description}</p>
                <p>Giá: {meal.price.toLocaleString('vi-VN')} VNĐ</p>
                <p>Trạng thái: {meal.availability}</p>
              </div>
            ))
          ) : (
            <p>Không có món ăn nào</p>
          )}
        </div>

        <h2>Phí hành lý</h2>
        <div className="luggage-fees-container">
          {luggageFees.length > 0 ? (
            luggageFees.map((luggage) => (
              <div
                key={luggage._id}
                className={`luggage-fee-card ${selectedLuggageFeeId === luggage._id ? 'selected' : ''}`}
                onClick={() => setSelectedLuggageFeeId(luggage._id)}
              >
                <h3>{luggage.nameLuggage}</h3>
                <p>Trọng lượng ký gửi: {luggage.weightChecked} kg</p>
                <p>Phí: {luggage.fee.toLocaleString('vi-VN')} VNĐ</p>
                <p>Loại hành lý: {luggage.type}</p>
                <p>Sân bay đi: {luggage.departurePoint}</p>
                <p>Sân bay đến: {luggage.destination}</p>
              </div>
            ))
          ) : (
            <p>Không có phí hành lý nào</p>
          )}
          
        </div>
        <br/>
          <div className='mac'>
             <div className="discount-section">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="discount-section-hh"
          />
          <p>
          <button onClick={handleApplyDiscount} className='nutmm'>Áp dụng mã giảm giá</button>
          </p>

        </div>
          </div>
        {ticket && (
          <div className="ticket-summary">
            <h2>Tóm tắt đặt vé</h2>
           <div className='max'>
            <p><strong>Thời gian khởi hành:</strong> {new Date(ticket.flightId?.departureTime).toLocaleTimeString()}</p>
            <p><strong>Thời gian đến:</strong> {new Date(ticket.flightId?.arrivalTime).toLocaleTimeString()}</p>
            <p><strong>Vị trí ghế:</strong> {ticket.seatId?.seatNumber} ({ticket.seatId?.seatClass})</p>
            <p><strong>Thời gian bay:</strong> {ticket.flightId?.duration} tiếng</p>
            <p><strong>Loại hành lý:</strong> {ticket.luggageId?.type === "inland" ? "Nội địa" : "Quốc tế"}</p>
            <p><strong>Trọng lượng hành lý xách tay:</strong> {ticket.luggageId?.weightCarryOn} kg</p>
            <p><strong>Trọng lượng hành lý ký gửi:</strong> {ticket.luggageId?.weightChecked} kg</p>
            <p><strong>Tiền vé:</strong> {ticket.price?.toLocaleString('vi-VN')} VNĐ</p>
            <p><strong>Giá giảm:</strong> 
            {discountData?.discountAmount 
            ? (discountData.discountAmount + (ticket?.discountPrice || 0)).toLocaleString('vi-VN') 
            : ticket.discountPrice?.toLocaleString('vi-VN')} VNĐ
            </p>
            <p><strong>Giá thuế:</strong> {ticket.taxPrice?.toLocaleString('vi-VN')} VNĐ</p>
            <p><strong>Tổng số tiền:</strong> 
              {calculateTotal()} VNĐ
            </p>
           </div>
          </div>
        )}
       

        <button className="book-btn" onClick={handleBookTicket}>
          Đặt vé
        </button>
        
      </div>
    </div>
  );
};

export default BookingModal;
