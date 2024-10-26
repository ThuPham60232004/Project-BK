import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './DiscountCodeList.css'; 
import { toast} from 'react-toastify';
import './DiscountCodeList.css'; 

const DiscountCode = () => {
  const [discountCodes, setDiscountCodes] = useState([]);

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/discounts');
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
    if (type === 'fixed') return ' NVNĐ';
    if (type === 'percentage') return '%';
    return type;
  };

  return (
   <div>
    <h2>Các mã giảm giá hời cho người dùng:</h2>
     <div className="discount-container1">
      <ul className="discount-list1">
        {discountCodes.slice(0, 3).map(discountCode => (  // Only show 3 items
          <li key={discountCode._id} className="discount-item1">
            <div className="discount-content1">
              <div className="discount-header1">
                <div className="discount-icon1">
                  <img src="https://cdn.tgdd.vn/Files/2015/01/16/599674/sale-icon.png" alt="Shopee Icon" /> 
                </div>
                <div className="discount-info1">
                  <div className="discount-value1">Giảm {discountCode.discountValue}{getDiscountTypeLabel(discountCode.discountType)}</div>
                </div>
              </div>
              <div className="discount-details1">
                <span>Tên mã: {discountCode.code}</span>
                <span>Số lượng mã: {discountCode.amountDiscountCode}</span>
                <span>Ngày bắt đầu: {new Date(discountCode.startDate).toLocaleDateString()}</span>
                <span>HSD: {new Date(discountCode.expirationDate).toLocaleDateString()}</span>
              </div>
              <div className="discount-footer1">
                <button className="discount-button1">
                    <Link to="/" className='hh'>MỞ WEB NGAY</Link>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
   </div>
  );
};

export default DiscountCode;
