import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TransferConfirmation.css';
const TransferConfirmation = () => {
  const location = useLocation();
  const { recipientName, accountNumber, bankName, content, method, amount, userName } = location.state;
  const navigate=useNavigate();

  const handleClick=()=>{
    navigate('/OTPScreen',{ state: { userName,amount } })
  }
  return (
    <div className="transfer-confirmation">
      <div className="transfer-header">
        <h2>Xác nhận chuyển tiền</h2>
        <div className="close-icon2">✖</div>
      </div>

      <div className="transfer-details">
        <div className="detail-item">
          <span>Tên người đặt:</span>
          <strong>{userName}</strong>
        </div>
        <div className="detail-item">
          <span>Tên người nhận:</span>
          <strong>{recipientName}</strong>
        </div>
        <div className="detail-item">
          <span>Số tài khoản:</span>
          <strong>{accountNumber}</strong>
        </div>
        <div className="detail-item">
          <span>Tên ngân hàng:</span>
          <div className="bank-info">
            <img src="https://play-lh.googleusercontent.com/ECFxNfcCEd34E4kBugtndIZcugF--c1GaOcQJF09AnIB6YHySXWBPVsYI9zJbsOkzqA=w240-h480-rw" alt="TPBank" className="bank-logo" />
            <strong>{bankName}</strong>
          </div>
        </div>
        <div className="detail-item">
          <span>Nội dung:</span>
          <strong> {content}</strong>
        </div>
        <div className="detail-item">
          <span>Cách thức:</span>
          <strong>{method}</strong>
        </div>
      </div>

      <div className="amount-section">
        <span>Số tiền chuyển</span>
        <strong>{amount} VND</strong>
      </div>

      <div className="action-buttons">
        <button className="cancel-button">HỦY BỎ</button>
        <button className="confirm-button" onClick={handleClick}>XÁC NHẬN</button>
      </div>
    </div>
  );
};

export default TransferConfirmation;
