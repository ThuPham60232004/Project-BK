import React, { useState } from 'react';
import PaymentScreen from '../PaymentScreen/PaymentScreen'; 
import './OTPScreen.css';
import { useLocation } from 'react-router-dom';
const OTPScreen = () => {
  const location = useLocation();
  const [pin, setPin] = useState(['', '', '', '']);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const { userName,amount } = location.state; 
  const handlePinInput = (num) => {
    const newPin = [...pin];
    const emptyIndex = newPin.findIndex((item) => item === '');
    if (emptyIndex !== -1) {
      newPin[emptyIndex] = num;
      setPin(newPin);
    }
  };

  const handleDelete = () => {
    const newPin = [...pin];
    const filledIndex = newPin.findIndex((item) => item === '');
    if (filledIndex === -1) {
      newPin[newPin.length - 1] = '';
    } else if (filledIndex > 0) {
      newPin[filledIndex - 1] = '';
    }
    setPin(newPin);
  };

  const handleConfirmPayment = () => {
    setIsPaymentConfirmed(true); 
  };

  const generateTransactionId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase(); 
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return { date, time };
  };

  const { date, time } = getCurrentDateTime();
  const transactionId = generateTransactionId();

  return (
    <div className="otp-screen-container">
      {!isPaymentConfirmed ? (
        <>
          <div className="lock-icon">🔒</div>
          <h2>Nhập PIN Smart OTP (eToken+) để xác nhận giao dịch!</h2>

          <div className="pin-input-container">
            {pin.map((item, index) => (
              <div key={index} className="pin-circle">
                {item}
              </div>
            ))}
          </div>

          <div className="keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button key={num} className="keypad-btn" onClick={() => handlePinInput(num)}>
                {num}
              </button>
            ))}
            <button className="keypad-btn delete-btn" onClick={handleDelete}>
              Xóa
            </button>
          </div>

          <button className="confirm-btn3">Hủy bỏ</button>
          <button className="confirm-btn3" onClick={handleConfirmPayment}>Xác nhận</button>
        </>
      ) : (
        <PaymentScreen
          amount={amount}
          recipient={userName}
          date={date}
          time={time}
          transactionId={transactionId}
        />
      )}
    </div>
  );
};

export default OTPScreen;
