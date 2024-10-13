import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, TextField } from '@mui/material';
import './SingleHotelRoom.css';

const SingleHotelRoom = () => {
  const { id } = useParams(); 
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedHotel, setEditedHotel] = useState({});

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/hotels/find/${id}`);
        setHotel(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setLoading(false);
      }
    };
    fetchHotelDetails();
  }, [id]);

  const handleOpenEditModal = () => {
    setEditedHotel(hotel);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedHotel({ ...editedHotel, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/hotels/${id}`, editedHotel);
      setHotel(editedHotel);
      handleCloseEditModal();
    } catch (err) {
      console.error("Error updating hotel:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!hotel) return <div>No hotel found.</div>;

  return (
    <div className='SingleHotelRoom'>
      <h2>{hotel.name}</h2>
      <div className='ImageGallery'>
        {hotel.photos && hotel.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Hotel ${index + 1}`} />
        ))}
      </div>
      <div className='HotelDetails'>
        <p><strong>Loại khách sạn:</strong> {hotel.type}</p>
        <p><strong>Thành phố:</strong> {hotel.city}</p>
        <p><strong>Địa chỉ:</strong> {hotel.address}</p>
        <p><strong>Mô tả:</strong> {hotel.desc}</p>
        <p><strong>Đánh giá:</strong> {hotel.rating}</p>
        <p><strong>Giá nhỏ nhất:</strong> {hotel.cheapestPrice}</p>
        <p><strong>Id quản lý:</strong> {hotel.idAdmin}</p>
        <Button variant="contained" color="primary" onClick={handleOpenEditModal}>
          Chỉnh sửa
        </Button>
      </div>

      <Modal open={openEditModal} onClose={handleCloseEditModal}>
    <div className="modal-content1">
        <h2>Chỉnh sửa thông tin khách sạn</h2>
        <Button variant="outlined" color="secondary" onClick={handleCloseEditModal} style={{ marginBottom: '10px' }}>
            Đóng
        </Button>
        <div className='modal-content-container'>
            <form onSubmit={handleEditSubmit}>
                <TextField
                    name="name"
                    label="Tên khách sạn"
                    value={editedHotel.name}
                    onChange={handleEditChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="type"
                    label="Loại khách sạn"
                    value={editedHotel.type}
                    onChange={handleEditChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="city"
                    label="Thành phố"
                    value={editedHotel.city}
                    onChange={handleEditChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="address"
                    label="Địa chỉ"
                    value={editedHotel.address}
                    onChange={handleEditChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="desc"
                    label="Mô tả"
                    value={editedHotel.desc}
                    onChange={handleEditChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="rating"
                    label="Đánh giá"
                    type="number"
                    value={editedHotel.rating}
                    onChange={handleEditChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="cheapestPrice"
                    label="Giá nhỏ nhất"
                    type="number"
                    value={editedHotel.cheapestPrice}
                    onChange={handleEditChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                    Lưu
                </Button>
                    </form>
                </div>
            </div>
        </Modal>

    </div>
  );
};

export default SingleHotelRoom;
