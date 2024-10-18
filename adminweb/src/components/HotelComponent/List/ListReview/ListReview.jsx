import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './ListReview.css';

const ListReview = () => {
  const [review, setReview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/reviews/');
        setReview(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReview();
  }, []);

  const handleClickAdd = () => {
    navigate('/NewReview');
  };

  const handleReview = (params) => {
    const { _id } = params.row;
    navigate(`/SingleReview/${_id}`); 
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/reviews/${id}`);
      setReview(review.filter((rev) => rev._id !== id)); 
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: 'userId', headerName: 'Id người dùng', width: 250 },
    { field: 'hotelId', headerName: 'Id khách sạn', width: 250 },
    { field: 'roomId', headerName: 'Id phòng', width: 250 },
    { field: 'rating', headerName: 'Đánh giá sao', width: 100 },
    { field: 'comment', headerName: 'Nội dung đánh giá', width: 200 },
    { field: 'idAdmin', headerName: 'Id quản lý', width: 200 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button className='btnreview' onClick={() => handleDeleteReview(params.row._id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className='ListReview'>
      <div className='ListReviewCointainer'>
        <h2>Danh sách bình luận</h2>
        <div className='ListReviewCointainerBtn' onClick={handleClickAdd}>
          <h3>Thêm bình luận</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%', marginLeft: '20px' }}>
        <DataGrid
          rows={review}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[13]}
          checkboxSelection
          onRowClick={(params) => handleReview(params)} 
        />
      </Box>
    </div>
  );
};

export default ListReview;
