import React from 'react';
import './PaymentScreen.css';
import { Navigate, useNavigate } from 'react-router-dom';
const PaymentScreen = ({ amount, recipient, date, time, transactionId }) => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/');
  }
  return (
    <div className="payment-screen">
      <div className="payment-screen__header">
        <div className="payment-screen__icon">✔</div>
        <div className="payment-screen__title">CHUYỂN KHOẢN THÀNH CÔNG</div>
        <div className="payment-screen__amount">{amount} VND</div>
      </div>
      
      <div className="payment-screen__details">
        <div className="payment-screen__detail-item">
          <span>Người thụ hưởng:</span> <strong>{recipient}</strong>
        </div>
        <div className="payment-screen__detail-item">
          <span>Thời gian:</span> <strong>{time} {date}</strong>
        </div>
        <div className="payment-screen__detail-item">
          <span>Mã giao dịch:</span> <strong>{transactionId}</strong>
        </div>
      </div>

      <button className="payment-screen__save-button" onClick={handleClick}>Tiếp tục</button>
    </div>
  );
};

export default PaymentScreen;
