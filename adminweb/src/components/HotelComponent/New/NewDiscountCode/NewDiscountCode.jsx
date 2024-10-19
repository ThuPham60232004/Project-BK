import React, { useState } from 'react';
import './NewDiscountCode.css';
import axios from 'axios';

const NewDiscountCode = () => {
  const [discountData, setDiscountData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    startDate: '',
    expirationDate: '',
    amountDiscountCode: '',
    idAdmin: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDiscountData({ ...discountData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post('http://localhost:9000/api/discounts', discountData);
        alert('Mã giảm giá đã được tạo thành công!');
        setDiscountData({
            code: '',
            discountType: 'percentage',
            discountValue: '',
            startDate: '',
            expirationDate: '',
            amountDiscountCode: '',
            idAdmin: '',
        });
    } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 400 && error.response.data.message.includes('E11000')) {
            alert('Mã giảm giá đã tồn tại. Vui lòng sử dụng mã khác.');
        } else {
            alert('Lỗi khi thêm mã giảm giá.');
        }
    }
};


  return (
    <div className="new-discount-code-container">
      <form className="discount-form" onSubmit={handleFormSubmit}>
        <h2 className="discount-form-title">Thêm Mã Giảm Giá Mới</h2>

        <div className="discount-form-group">
          <label htmlFor="code">Mã Giảm Giá:</label>
          <input
            id="code"
            name="code"
            type="text"
            className="discount-form-input"
            value={discountData.code}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="discount-form-group">
          <label htmlFor="discountType">Loại Giảm Giá:</label>
          <select
            id="discountType"
            name="discountType"
            className="discount-form-input"
            value={discountData.discountType}
            onChange={handleInputChange}
            required
          >
            <option value="percentage">Phần Trăm</option>
            <option value="fixed">Giá Cố Định</option>
          </select>
        </div>

        <div className="discount-form-group">
          <label htmlFor="discountValue">Giá Trị Giảm Giá:</label>
          <input
            id="discountValue"
            name="discountValue"
            type="number"
            className="discount-form-input"
            value={discountData.discountValue}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="discount-form-group">
          <label htmlFor="startDate">Ngày Bắt Đầu:</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            className="discount-form-input"
            value={discountData.startDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="discount-form-group">
          <label htmlFor="expirationDate">Ngày Hết Hạn:</label>
          <input
            id="expirationDate"
            name="expirationDate"
            type="date"
            className="discount-form-input"
            value={discountData.expirationDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="discount-form-group">
          <label htmlFor="amountDiscountCode">Số Lượng Mã Giảm Giá:</label>
          <input
            id="amountDiscountCode"
            name="amountDiscountCode"
            type="number"
            className="discount-form-input"
            value={discountData.amountDiscountCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="discount-form-group">
          <label htmlFor="idAdmin">ID Quản Trị Viên:</label>
          <input
            id="idAdmin"
            name="idAdmin"
            type="text"
            className="discount-form-input"
            value={discountData.idAdmin}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="discount-form-submit-btn">Tạo Mã Giảm Giá</button>
      </form>
    </div>
  );
};

export default NewDiscountCode;
