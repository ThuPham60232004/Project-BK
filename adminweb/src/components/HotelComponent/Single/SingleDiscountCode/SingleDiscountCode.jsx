import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, TextField, Button } from '@mui/material';
import './SingleDiscountCode.css';

const SingleDiscountCode = () => {
  const { id } = useParams();
  const [discountCode, setDiscountCode] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedDiscountCode, setEditedDiscountCode] = useState({});

  useEffect(() => {
    const fetchDiscountCode = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/discounts/${id}`);
        setDiscountCode(res.data);
      } catch (err) {
        console.error("Error fetching discount code:", err);
      }
    };
    fetchDiscountCode();
  }, [id]);

  const handleOpenEditModal = () => {
    setEditedDiscountCode(discountCode);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDiscountCode({ ...editedDiscountCode, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/discounts/${id}`, editedDiscountCode);
      setDiscountCode(editedDiscountCode);
      handleCloseEditModal();
    } catch (err) {
      console.error("Error updating discount code:", err);
    }
  };

  if (!discountCode) return <div>Loading...</div>;

  return (
    <div className='SingleDiscountCode'>
      <h2>Mã giảm giá: {discountCode.code}</h2>
      <div className="details">
        <p>Loại mã giảm giá: <span>{discountCode.discountType}</span></p>
        <p>Giá trị: <span>{discountCode.discountValue}</span></p>
        <p>Ngày bắt đầu: <span>{discountCode.startDate}</span></p>
        <p>Ngày hết hạn: <span>{discountCode.expirationDate}</span></p>
        <p>Số lượng mã giảm giá: <span>{discountCode.amountDiscountCode}</span></p>
        <p>Id quản lý: <span>{discountCode.idAdmin}</span></p>
      </div>
      <Button variant="contained" color="primary" onClick={handleOpenEditModal}>
        Chỉnh sửa
      </Button>

      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <div style={{marginTop:'20px'}} className="modal-content2">
          <h2>Chỉnh sửa mã giảm giá</h2>
          <form onSubmit={handleEditSubmit}>
            <div style={{width:'100%', display:'flex',gap:'10px'}}>
              <TextField style={{width:'70%'}}
              name="code"
              label="Mã code"
              value={editedDiscountCode.code}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField style={{width:'30%'}}
              name="discountType"
              label="Loại mã giảm giá"
              value={editedDiscountCode.discountType}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            </div>
            
            <TextField
              name="discountValue"
              label="Giá trị mã giảm giá"
              value={editedDiscountCode.discountValue}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <div style={{width:'100%', display:'flex',gap:'10px'}}>
              <TextField style={{width:'50%'}}
              name="startDate"
              label="Ngày bắt đầu"
              type="date"
              value={editedDiscountCode.startDate}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField style={{width:'50%'}}
              name="expirationDate"
              label="Ngày hết hạn"
              type="date"
              value={editedDiscountCode.expirationDate}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />
            </div>
            
            <Button variant="contained" color="primary" type="submit">
              Lưu
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SingleDiscountCode;
