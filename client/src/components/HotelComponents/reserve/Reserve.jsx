import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchContext } from "../../../context/SearchContext";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaypal, faCcVisa, faCcMastercard, faCcApplePay } from '@fortawesome/free-brands-svg-icons';

const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const date = new Date(start.getTime());
  const dates = [];
  
  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const Reserve = ({ setOpen, hotelId, roomId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmountState, setDiscountAmountState] = useState(0);
  const { dates } = useContext(SearchContext);
  const [room, setRoom] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const defaultStartDate = dates && dates[0] && dates[0].startDate ? new Date(dates[0].startDate) : new Date();
  const defaultEndDate = dates && dates[0] && dates[0].endDate ? new Date(dates[0].endDate) : new Date(new Date().setDate(new Date().getDate() + 1));
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const navigate = useNavigate();
  const calculateDepositAmount = (totalPrice) => {
    return totalPrice * 0.2; // Giá cọc bằng 20% tổng giá tiền
  };
  
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/rooms/${roomId}`);
        setRoom(res.data);
        setSelectedRooms([res.data._id]);
      } catch (err) {
        console.error("Lấy thông tin phòng thất bại", err);
      }
    };
    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/bookings?hotel=${hotelId}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Lấy thông tin đặt phòng thất bại", err);
      }
    };
    fetchBookings();
  }, [hotelId]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const res = await axios.get(`http://localhost:9000/api/users/${userId}`);
          setUserInfo(res.data);
        } catch (err) {
          console.error("Lấy thông tin người dùng thất bại", err);
        }
      }
    };
    fetchUserInfo();
  }, []);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleApplyDiscount = async () => {
    try {
      const res = await axios.post("http://localhost:9000/api/discounts/apply", { code: discountCode });
      setDiscountAmountState(res.data.discountAmount);
    } catch (err) {
      console.error("Áp dụng mã giảm giá thất bại", err);
    }
  };

  const alldates = getDatesInRange(startDate, endDate);
  const numberOfBookingDays = alldates.length;

  const isAvailable = (room) => {
    if (!room) return false;
    
    const isUnavailable = room.availability.some((entry) =>
      alldates.includes(new Date(entry.date).getTime()) && entry.isBooked
    );
  
    const isPending = bookings.some((booking) =>
      booking.room.includes(room._id) &&
      booking.status === "pending" &&
      alldates.some(date => new Date(booking.startDate).getTime() <= date && date <= new Date(booking.endDate).getTime())
    );
  
    return !isUnavailable && !isPending;
  };

  const calculateTotalPriceDetails = () => {
    if (!room) return { totalPriceBeforeTax: 0, totalTax: 0, discountAmount: 0, finalTotalPrice: 0, depositAmount: 0 };
    
    let totalPriceBeforeTax = 0;
    let totalTax = 0;
  
    selectedRooms.forEach((roomId) => {
      if (room._id === roomId) {
        const discountPrice = room.discountPrice || room.price;
        const roomTotalBeforeTax = discountPrice * numberOfBookingDays;
        totalPriceBeforeTax += roomTotalBeforeTax;
      }
    });
  
    // Áp dụng mã giảm giá trước khi tính thuế
    const totalPriceAfterDiscount = totalPriceBeforeTax - discountAmountState;
  
    // Tính thuế sau khi áp dụng giảm giá
    const taxRate = room.taxPrice || 0.1; // Thuế 10%
    totalTax = taxRate
  
    const finalTotalPrice = totalPriceAfterDiscount + totalTax;
    const depositAmount = calculateDepositAmount(finalTotalPrice); // Tính giá cọc
  
    return {
      totalPriceBeforeTax,
      totalTax,
      discountAmount: discountAmountState,
      depositAmount,
      finalTotalPrice
    };
  };
  
  const updateRoomAvailability = async () => {
    try {
      await axios.post("http://localhost:9000/api/rooms/update-availability", {
        hotelId,
        roomId,
        dates: alldates
      });
    } catch (err) {
      console.error("Cập nhật tình trạng phòng thất bại", err);
    }
  };

  const mockPayment = () => {
    // Mô phỏng thanh toán thành công
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000); // Mô phỏng thời gian thanh toán
    });
  };

  const handleClick = async () => {
    try {
      const paymentResult = await mockPayment();
      if (paymentResult.success) {
        await updateRoomAvailability();

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");

        if (!userId || !token) {
          console.error("Thiếu thông tin ID người dùng hoặc token trong localStorage.");
          return;
        }

        const bookingData = {
          user: userId,
          hotel: hotelId,
          room: selectedRooms,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          paymentMethod: paymentMethod,
          totalPrice: calculateTotalPriceDetails().finalTotalPrice,
          status: "pending"
        };

        await axios.post("http://localhost:9000/api/bookings", bookingData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        alert("Đặt phòng thành công!");
        navigate("/");
        setOpen(false);
      } else {
        alert("Thanh toán không thành công.");
      }
    } catch (err) {
      console.error("Tạo đặt phòng thất bại", err);
    }
  };

  return (
    <div className="reserve">
      <div className="reserve-container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserve-close"
          onClick={() => setOpen(false)}
        />
        <h1 className="reserve-title">Đặt Phòng</h1>
        {userInfo && (
          <div className="user-info">
            <h2>Thông tin người dùng</h2>
            <p>Tên người dùng: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <p>Quốc gia: {userInfo.country}</p>
            <p>Thành phố: {userInfo.city}</p>
            <p>Số điện thoại: {userInfo.phone}</p>
            <p>CCCD: {userInfo.CCCD}</p>
          </div>
        )}
        <h2>Xác nhận ngày ở</h2>
        <div className="reserve-dates">
          <div>
            <label>Ngày bắt đầu</label>
            <DatePicker 
              selected={startDate} 
              onChange={(date) => setStartDate(date || new Date())} 
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <label>Ngày kết thúc</label>
            <DatePicker 
              selected={endDate} 
              onChange={(date) => setEndDate(date || new Date())} 
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
        <div className="reserve-summary">
        <h2>Tóm tắt đơn hàng</h2>
        {room && (
          <div className="reserve-room-info">
            <h3>Phòng: {room.name}</h3>
            <p>Số ngày đặt: {numberOfBookingDays}</p>
            <p>Giá phòng: {room.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>Tổng giá trước thuế: {calculateTotalPriceDetails().totalPriceBeforeTax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>Thuế: {calculateTotalPriceDetails().totalTax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>Giảm giá: {calculateTotalPriceDetails().discountAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>Giá cọc (20%): {calculateTotalPriceDetails().depositAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <h4>Tổng cộng: {calculateTotalPriceDetails().finalTotalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>

          </div>
        )}
       </div>

        <div className="reserve-discount">
          <h2>Mã giảm giá</h2>
          <input 
            type="text" 
            value={discountCode} 
            onChange={handleDiscountCodeChange} 
            placeholder="Nhập mã giảm giá" 
          />
          <button onClick={handleApplyDiscount}>Áp dụng</button>
        </div>
        <div className="reserve-payment">
          <h2>Phương thức thanh toán</h2>
          <div>
            <input
              type="radio"
              id="paypal"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
            />
              <FontAwesomeIcon icon={faPaypal} /> Paypal
          </div>
          <div>
            <input
              type="radio"
              id="visa"
              value="visa"
              checked={paymentMethod === "visa"}
              onChange={handlePaymentMethodChange}
            />
              <FontAwesomeIcon icon={faCcVisa} /> Visa
          </div>
          <div>
            <input
              type="radio"
              id="mastercard"
              value="mastercard"
              checked={paymentMethod === "mastercard"}
              onChange={handlePaymentMethodChange}
            />
              <FontAwesomeIcon icon={faCcMastercard} /> Mastercard
          </div>
          <div>
            <input
              type="radio"
              id="vnpay"
              value="vnpay"
              checked={paymentMethod === "vnpay"}
              onChange={handlePaymentMethodChange}
            />
              <FontAwesomeIcon icon={faCcApplePay} /> VNPay
          </div>
          <div>
            <input
              type="radio"
              id="moca"
              value="moca"
              checked={paymentMethod === "moca"}
              onChange={handlePaymentMethodChange}
            />
              <FontAwesomeIcon icon={faCcApplePay} /> Moca
          </div>
          <div>
            <input
              type="radio"
              id="webmoney"
              value="webmoney"
              checked={paymentMethod === "webmoney"}
              onChange={handlePaymentMethodChange}
            />
              <FontAwesomeIcon icon={faCcApplePay} /> Webmoney
          </div>
        </div>
        <button onClick={handleClick} className="reserve-submit">Đặt phòng</button>
      </div>
    </div>
  );
};

export default Reserve;
