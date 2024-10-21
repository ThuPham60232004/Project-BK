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
    setImage(null); 
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
    for (const key in formData) {
      updatedData.append(key, formData[key]);
    }
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
    // <div className="single-user-container">
    //   <Typography variant="h4" gutterBottom>Chi tiết người dùng:</Typography>
    //   <div className="single-user-card">
    //     <Avatar 
    //       alt={user.username} 
    //       src={user.img || '/path/to/default/avatar.jpg'} 
    //       sx={{ width: 100, height: 100 }} 
    //     />
    //     <Typography variant="h5">{user.username}</Typography>
    //     <Grid container spacing={2}>
    //       <Grid item xs={6}>
    //         <Typography><Email /> <strong>Email:</strong> {user.email}</Typography>
    //         <Typography><LocationOn /> <strong>Đất nước:</strong> {user.country}</Typography>
    //         <Typography><LocationOn /> <strong>Thành phố:</strong> {user.city}</Typography>
    //         <Typography><Description /> <strong>Họ và tên hành khách:</strong> {user.passengerName}</Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography><Phone /> <strong>Số điện thoại:</strong> {user.phone}</Typography>
    //         <Typography><Description /> <strong>Căn cước công dân:</strong> {user.CCCD}</Typography>
    //         <Typography><Description /> <strong>Số hộ chiếu:</strong> {user.passportNumber}</Typography>
    //         <Typography><strong>Quản trị viên:</strong> {user.isAdmin ? 'Có' : 'Không'}</Typography>
    //         <Typography><strong>Phân quyền:</strong> {user.role}</Typography>
    //       </Grid>
    //     </Grid>
    //     <Button variant="contained" color="primary" onClick={handleOpen}>Chỉnh sửa</Button>
    //   </div>

      // <Modal open={open} onClose={handleClose}>
      //   <div className="modal-content6">
      //     <Typography variant="h6">Chỉnh sửa thông tin người dùng</Typography>
      //     <form onSubmit={handleSubmit}>
      //       <TextField
      //         type="text"
      //         name="username"
      //         value={formData.username}
      //         onChange={handleChange}
      //         label="Tên người dùng"
      //         variant="outlined"
      //         className="modal-input"
      //         fullWidth
      //         margin="normal"
      //       />
      //       <TextField
      //         type="email"
      //         name="email"
      //         value={formData.email}
      //         onChange={handleChange}
      //         label="Email"
      //         variant="outlined"
      //         className="modal-input"
      //         fullWidth
      //         margin="normal"
      //       />
      //       <TextField
      //         type="text"
      //         name="country"
      //         value={formData.country}
      //         onChange={handleChange}
      //         label="Đất nước"
      //         variant="outlined"
      //         className="modal-input"
      //         fullWidth
      //         margin="normal"
      //       />
      //       <TextField
      //         type="text"
      //         name="city"
      //         value={formData.city}
      //         onChange={handleChange}
      //         label="Thành phố"
      //         variant="outlined"
      //         className="modal-input"
      //         fullWidth
      //         margin="normal"
      //       />
      //       <TextField
      //         type="text"
      //         name="phone"
      //         value={formData.phone}
      //         onChange={handleChange}
      //         label="Số điện thoại"
      //         variant="outlined"
      //         className="modal-input"
      //         fullWidth
      //         margin="normal"
      //       />
      //       <TextField
      //         type="text"
      //         name="CCCD"
      //         value={formData.CCCD}
      //         onChange={handleChange}
      //         label="Căn cước công dân"
      //         variant="outlined"
      //         className="modal-input"
      //         fullWidth
      //         margin="normal"
      //       />
      //       <TextField
      //         type="text"
      //         name="passportNumber"
      //         value={formData.passportNumber}
      //         onChange={handleChange}
      //         label="Số hộ chiếu"
      //         variant="outlined"
      //         className="modal-input"
      //         fullWidth
      //         margin="normal"
      //       />
      //       <TextField
      //         type="text"
      //         name="passengerName"
      //         value={formData.passengerName}
      //         onChange={handleChange}
      //         label="Họ và tên hành khách"
      //         variant="outlined"
      //         className="modal-input"
      //         fullWidth
      //         margin="normal"
      //       />
      //       {/* Trường tải lên hình ảnh */}
      //       <input
      //         type="file"
      //         accept="image/*"
      //         onChange={handleImageChange}
      //         style={{ margin: '16px 0' }}
      //       />
      //       <Button variant="contained" color="success" type="submit">Lưu</Button>
      //     </form>
      //   </div>
      // </Modal>
    // </div>
    <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'20px'}}>
      <h1>Chi tiết người dùng</h1>
      <div style={{width:'100%', display:'flex',flexDirection:'column',gap:'20px',justifyContent:'center'}}>
        <img style={{width:'200px', height:'200px', borderRadius:'100%', margin:'20px auto'}} src={user.img || '/path/to/default/avatar.jpg'} alt="" />
        <div style={{width:'100%',display:'flex', flexDirection:'column', gap:'10px', border:'1px solid gray', borderRadius:'10px'}}>
          <h2 style={{border:'none',marginTop:'20px'}}>{user.username}</h2>

          <div style={{width:'100%',display:'flex',gap:'10px',padding:'0 20px'}}>
          <p style={{width:'50%'}}>Họ và tên: <strong>{user.passengerName}</strong></p>
          <p style={{width:'25%'}}>Quản trị viên: <strong>{user.isAdmin ? 'Có' : 'Không'}</strong></p>
           <p style={{width:'25%'}}>Phân quyền: <strong>{user.role}</strong></p>
          </div>
          <div style={{width:'100%',display:'flex',gap:'10px',padding:'0 20px'}}>
            <p style={{width:'50%'}}>Đất nước : <strong> {user.country}</strong></p>
            <p style={{width:'50%'}}>Thành phố: <strong> {user.city}</strong></p>
          </div>
            <div style={{width:'100%',display:'flex',gap:'10px',padding:'0 20px'}}>
            <p style={{width:'50%'}}>Số điện thoại : <strong>{user.phone}</strong></p>
            <p style={{width:'50%'}}>Email: <strong> {user.email}</strong></p>
          </div>
           <div style={{width:'100%',display:'flex',gap:'10px',padding:'0 20px'}}>
            <p style={{width:'50%'}}>CCCD : <strong>{user.CCCD}</strong></p>
            <p style={{width:'50%'}}>Hộ chiếu: <strong> {user.passportNumber}</strong></p>
          </div>
          <div style={{width:'100%', display:'flex', justifyContent:'center', marginBottom:'20px'}}>
             <button style={{width:'90%',background:'green',margin:'0', padding:'10px', fontSize:'18px', color:'white', fontWeight:'700', border:'none', borderRadius:'10px'}} onClick={handleOpen}>Chỉnh sửa</button>
          </div>
         
        </div>
      </div>
      
      <Modal open={open} onClose={handleClose}>
        <div className="modal-content6">
          <h2>Chỉnh sửa thông tin người dùng</h2>
          <form onSubmit={handleSubmit}>
            
            <label htmlFor="">Tên người dùng</label>
            <TextField
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
             <label htmlFor="">Email</label>
            <TextField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
             <label htmlFor="">Đất nước</label>
            <TextField
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
             <label htmlFor="">Thành phố</label>
            <TextField
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <label htmlFor="">Số điện thoại</label>
            <TextField
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <label htmlFor="">CCCD</label>
            <TextField
              type="text"
              name="CCCD"
              value={formData.CCCD}
              onChange={handleChange}
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <label htmlFor="">Số hộ chiếu</label>
            <TextField
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              variant="outlined"
              className="modal-input"
              fullWidth
              margin="normal"
            />
            <label htmlFor="">Họ và tên</label>
            <TextField
              type="text"
              name="passengerName"
              value={formData.passengerName}
              onChange={handleChange}
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
