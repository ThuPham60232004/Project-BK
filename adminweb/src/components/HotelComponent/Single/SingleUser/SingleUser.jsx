import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button, Grid, TextField, Typography, Avatar } from '@mui/material';
import { Email, Phone, LocationOn, Description } from '@mui/icons-material';
import './SingleUser.css';

const SingleUser = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/users/${id}`);
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage(null); // Reset image when closing the modal
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();

    // Append form data to FormData object
    for (const key in formData) {
      updatedData.append(key, formData[key]);
    }
    
    // Append the new image file if it exists
    if (image) {
      updatedData.append('img', image);
    }

    try {
      await axios.put(`http://localhost:9000/api/users/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser({ ...formData, img: image ? URL.createObjectURL(image) : user.img }); // Update user state
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div>Loading user details...</div>;

  return (
    <div className="single-user-container">
      <Typography variant="h4" gutterBottom>Chi tiết người dùng:</Typography>
      <div className="single-user-card">
        {/* Hiển thị hình ảnh người dùng */}
        <Avatar 
          alt={user.username} 
          src={user.img || '/path/to/default/avatar.jpg'} // Đường dẫn đến hình ảnh mặc định
          sx={{ width: 100, height: 100 }} 
        />
        <Typography variant="h5">{user.username}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography><Email /> <strong>Email:</strong> {user.email}</Typography>
            <Typography><LocationOn /> <strong>Đất nước:</strong> {user.country}</Typography>
            <Typography><LocationOn /> <strong>Thành phố:</strong> {user.city}</Typography>
            <Typography><Description /> <strong>Họ và tên hành khách:</strong> {user.passengerName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><Phone /> <strong>Số điện thoại:</strong> {user.phone}</Typography>
            <Typography><Description /> <strong>Căn cước công dân:</strong> {user.CCCD}</Typography>
            <Typography><Description /> <strong>Số hộ chiếu:</strong> {user.passportNumber}</Typography>
            <Typography><strong>Quản trị viên:</strong> {user.isAdmin ? 'Có' : 'Không'}</Typography>
            <Typography><strong>Phân quyền:</strong> {user.role}</Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleOpen}>Chỉnh sửa</Button>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className="modal-content6">
          <Typography variant="h6">Chỉnh sửa thông tin người dùng</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              label="Tên người dùng"
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <TextField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              label="Đất nước"
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="Thành phố"
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              label="Số điện thoại"
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="CCCD"
              value={formData.CCCD}
              onChange={handleChange}
              label="Căn cước công dân"
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              label="Số hộ chiếu"
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="passengerName"
              value={formData.passengerName}
              onChange={handleChange}
              label="Họ và tên hành khách"
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            {/* Trường tải lên hình ảnh */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ margin: '16px 0' }}
            />
            <Button variant="contained" color="success" type="submit">Lưu</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SingleUser;
