import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from '@mui/material';
import './SingleRoom.css'; // Thêm file CSS cho giao diện

const SingleRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (roomId) {
        try {
          const res = await axios.get(`http://localhost:9000/api/rooms/${roomId}`);
          setRoom(res.data);
          setFormData(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("roomId is undefined");
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/rooms/${roomId}`, formData);
      setOpen(false);
      setRoom(formData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ''] }); // Thêm một trường hình ảnh mới
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  if (!room) return <div>Loading room details...</div>;

  return (
    <div className="single-room-container">
      <h2 className="room-title">Chi tiết phòng: {room.title}</h2>
      <p className="room-description"><strong>Mô Tả:</strong> {room.desc}</p>
      <p className="room-price"><strong>Giá:</strong> {room.price} VND</p>
      <p className="room-discount"><strong>Giá Giảm:</strong> {room.discountPrice ? room.discountPrice : 'Không có'} VND</p>
      <p className="room-tax"><strong>Giá Thuế:</strong> {room.taxPrice ? room.taxPrice : 'Không có'} VND</p>
      <p className="room-max-people"><strong>Số Người Tối Đa:</strong> {room.maxPeople}</p>
      <p className="room-rating"><strong>Đánh giá:</strong> {room.rating} / 5</p>
      <p className="room-reviews"><strong>Số Lượng Đánh Giá:</strong> {room.numberOfReviews}</p>
      <p className="room-category"><strong>Hạng Mục:</strong> {room.category}</p>
      <div className="room-images">
        <strong>Hình Ảnh:</strong>
        {room.images && room.images.length > 0 ? (
          room.images.map((image, index) => (
            <img key={index} src={image} alt={`Room image ${index + 1}`} className="room-image" />
          ))
        ) : (
          <span>Không có hình ảnh</span>
        )}
      </div>
      <Button className="button-edit" variant="contained" onClick={handleOpen}>
        Chỉnh sửa
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className="modal-content5">
          <h3>Chỉnh sửa thông tin phòng</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Tên Phòng"
              className="modal-input"
            />
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Mô Tả"
              className="modal-textarea"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Giá (VND)"
              className="modal-input"
            />
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Giá Giảm (VND)"
              className="modal-input"
            />
            <input
              type="number"
              name="taxPrice"
              value={formData.taxPrice}
              onChange={handleChange}
              placeholder="Giá Thuế (VND)"
              className="modal-input"
            />
            <input
              type="number"
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleChange}
              placeholder="Số Người Tối Đa"
              className="modal-input"
            />
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Đánh giá"
              className="modal-input"
            />
            <div>
              <strong>Hình Ảnh:</strong>
              {formData.images && formData.images.map((image, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`URL hình ảnh ${index + 1}`}
                    className="modal-input"
                  />
                </div>
              ))}
              <Button variant="contained" onClick={handleAddImage}>Thêm Hình Ảnh</Button>
            </div>
            <Button className="button-save" type="submit" variant="contained">Lưu</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SingleRoom;
