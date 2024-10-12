import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './ListRoom.css';

const ListRoom = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate(); 
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/rooms/hotel/${hotelId}`); // Ensure the API route is correct
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, [hotelId]);

  const columns = [
    { field: 'title', headerName: 'Tên Phòng', width: 300 },
    { field: 'desc', headerName: 'Mô Tả', width: 400 },
    { field: 'price', headerName: 'Giá (VND)', width: 150 },
    { field: 'discountPrice', headerName: 'Giá Sau Khuyến Mãi (VND)', width: 200 },
    { field: 'taxPrice', headerName: 'Thuế (VND)', width: 150 },
    { field: 'maxPeople', headerName: 'Số Người Tối Đa', width: 150 },
    { field: 'numberOfReviews', headerName: 'Số người đánh giá', width: 150 },
    { field: 'availability', headerName: 'Giá trị phòng', width: 150 },
    { field: 'category', headerName: 'Phân loại phòng', width: 150 },
    { field: 'rating', headerName: 'Đánh giá sao', width: 150 },
    { field: 'reviews', headerName: 'Id đánh giá', width: 150 },
    { field: 'images', headerName: 'Hình phòng', width: 150 },
    { field: 'idAdmin', headerName: 'ID Admin', width: 150 },
  ];

  if (!rooms.length) return <div>Loading...</div>; 
  return (
    <div className="roomlist-container">
      <div className="roomlist-content">
        <h3>Danh Sách Phòng</h3>
        <DataGrid
          rows={rooms}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
          onRowClick={(params) => navigate(`/rooms/${params.row._id}`)}
        />
      </div>
    </div>
  );
};

export default ListRoom;
