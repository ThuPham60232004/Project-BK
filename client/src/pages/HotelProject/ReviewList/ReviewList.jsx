import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../../../components/HotelComponents/sidebar/Sidebar'; 
import './reviewlist.css';

const ReviewList = () => {
  const navigate = useNavigate(); 
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/reviews');
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, []);

  const columns = [
    { field: 'userId', headerName: 'ID Người Dùng', width: 150 },
    { field: 'hotelId', headerName: 'ID Khách Sạn', width: 150 },
    { field: 'roomId', headerName: 'ID Phòng', width: 150 },
    { field: 'rating', headerName: 'Đánh Giá', width: 150 },
    { field: 'comment', headerName: 'Nhận Xét', width: 300 },
    { field: 'idAdmin', headerName: 'ID Admin', width: 150 },
    {
      field: 'action',
      headerName: 'Hành Động',
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <div className="viewButton" onClick={() => navigate(`/reviews/${params.row._id}`)}>Xem</div>
          <div className="deleteButton">Xóa</div>
        </div>
      ),
    },
  ];

  if (!reviews.length) return <div>Loading...</div>;

  return (
    <div className="reviewlist-container">
      <Sidebar />
      <div className="reviewlist-content">
        <h1>Danh Sách Đánh Giá</h1>
        <DataGrid
          rows={reviews}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
          onRowClick={(params) => navigate(`/reviews/${params.row._id}`)} 
        />
      </div>
    </div>
  );
};

export default ReviewList;
