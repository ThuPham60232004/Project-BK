import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, TextField, Button, Typography, Box, Table, TableBody, TableCell, TableRow } from '@mui/material';
import './SingleNotification.css';

const SingleNotification = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedNotification, setEditedNotification] = useState({});

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/notifications/${id}`);
        setNotification(res.data);
      } catch (err) {
        console.error("Error fetching notification:", err);
      }
    };
    fetchNotification();
  }, [id]);

  const handleOpenEditModal = () => {
    setEditedNotification(notification);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedNotification({ ...editedNotification, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/notifications/${id}`, editedNotification);
      setNotification(editedNotification);
      handleCloseEditModal();
    } catch (err) {
      console.error("Error updating notification:", err);
    }
  };

  if (!notification) return <div>Loading...</div>;

  return (
    <Box className="SingleNotification" p={4}>
      <Typography variant="h4" gutterBottom>Thông báo chi tiết</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><strong>Id người dùng:</strong></TableCell>
            <TableCell>{notification.user}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Nội dung:</strong></TableCell>
            <TableCell>{notification.message}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Đánh dấu đọc chưa:</strong></TableCell>
            <TableCell>{notification.isRead ? "Đã đọc" : "Chưa đọc"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Id quản lý khách sạn:</strong></TableCell>
            <TableCell>{notification.idAdmin}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button variant="contained" color="primary" onClick={handleOpenEditModal} sx={{ mt: 2 }}>
        Chỉnh sửa
      </Button>

      {/* Modal chỉnh sửa thông báo */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box className="modal-content4">
          <Typography variant="h5" gutterBottom>Chỉnh sửa thông báo</Typography>
          <form onSubmit={handleEditSubmit}>
            <TextField
              name="user"
              label="Id người dùng"
              value={editedNotification.user}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="message"
              label="Nội dung"
              value={editedNotification.message}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="isRead"
              label="Đánh dấu đọc chưa"
              value={editedNotification.isRead}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Lưu
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default SingleNotification;
