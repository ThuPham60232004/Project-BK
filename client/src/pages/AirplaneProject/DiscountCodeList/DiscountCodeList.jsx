import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './DiscountCodeList.css'; 
import Navbar from "../../../components/AirplaneComponent/navbarAirplane/navbarAirplane";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const DiscountCodeList = () => {
  const [discountCodes, setDiscountCodes] = useState([]);

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/DiscountCodesAirplane/getdiscountCodesAirplanes');
        setDiscountCodes(response.data);
        toast.success('Danh sách mã giảm giá đã được tải thành công!');
      } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
        toast.error('Có lỗi xảy ra khi tải danh sách mã giảm giá.');
      }
    };

    fetchDiscountCodes();
  }, []);

  const getDiscountTypeLabel = (type) => {
    if (type === 'fixed') return 'VNĐ';
    if (type === 'percentage') return '%';
    return type;
  };

  return (
    <div className="discount-container">
      <Navbar/>
      <br/> <br/> <br/> <br/> <br/>
      <h2 className='m22'>Danh sách các mã giảm giá</h2>
      <br/>
      <ul className="discount-list">
        {discountCodes.map(discountCode => (
          <li key={discountCode._id} className="discount-item">
            <div className="discount-content">
              <div className="discount-header">
                <div className="discount-icon">
                  <img src="https://cdn.tgdd.vn/Files/2015/01/16/599674/sale-icon.png" alt="Shopee Icon" /> 
                </div>
                <div className="discount-info">
                  <div className="discount-value">Giảm 
                    {discountCode.discountValue}
                    {getDiscountTypeLabel
                    (discountCode.discountType)}</div>
                </div>
              </div>
              <div className="discount-details">
                <span>Tên mã: {discountCode.code}</span>
                {discountCode.amountDiscountCode && (
                  <span>Số lượng mã: {discountCode.amountDiscountCode}</span>
                )}
                {discountCode.startDate && (
                  <span>Ngày bắt đầu: {new Date(discountCode.startDate).toLocaleDateString()}</span>
                )}
                {discountCode.expirationDate && (
                  <span>HSD: {new Date(discountCode.expirationDate).toLocaleDateString()}</span>
                )}
              </div>
              <div className="discount-footer">
                <button className="discount-button">
                  <Link to="/">MỞ WEB NGAY</Link>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer /> 
    </div>
  );
};

export default DiscountCodeList;
