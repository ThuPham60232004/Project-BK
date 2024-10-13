import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import './SingleReview.css';

const SingleReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editedReview, setEditedReview] = useState({ rating: '', comment: '' });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/reviews/${id}`);
        setReview(res.data.review);
        setEditedReview({ rating: res.data.review.rating, comment: res.data.review.comment });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:9000/api/reviews/${id}`, editedReview);
      setReview((prev) => ({ ...prev, ...editedReview }));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!review) return <div>Không tìm thấy bài đánh giá</div>;

  return (
    <div className="SingleReview">
      <h1>Chi tiết đánh giá</h1>
      <p><strong>Người dùng ID:</strong> {review.userId._id}</p>
      <p><strong>Khách sạn:</strong> {review.hotelId.name}</p>
      <p><strong>Đánh giá sao:</strong> {review.rating}</p>
      <p><strong>Nội dung:</strong> {review.comment}</p>
      <p><strong>Ngày tạo:</strong> {new Date(review.createdAt).toLocaleString()}</p>
      <Button variant="outlined" onClick={handleOpen}>
        Chỉnh sửa đánh giá
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box className="modalBox">
          <Typography className="modalTitle" variant="h6" component="h2">
            Chỉnh sửa đánh giá
          </Typography>
          <TextField
            label="Đánh giá sao"
            name="rating"
            value={editedReview.rating}
            onChange={handleEditChange}
            fullWidth
            className="modalTextField"
          />
          <TextField
            label="Nội dung"
            name="comment"
            value={editedReview.comment}
            onChange={handleEditChange}
            fullWidth
            className="modalTextField"
            multiline
            rows={4}
          />
          <Button className="modalButton" onClick={handleEditSubmit}>
            Lưu
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SingleReview;
