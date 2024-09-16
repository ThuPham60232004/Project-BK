import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../../../components/hotelcomponents/sidebar/Sidebar';
import './roomlist.css';

const RoomList = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate(); 
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/rooms/hotel/${hotelId}`);
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
    { field: 'price', headerName: 'Giá (VND)', width: 150, valueFormatter: ({ value }) => value.toLocaleString() },
    { field: 'discountPrice', headerName: 'Giá Sau Khuyến Mãi (VND)', width: 200, valueFormatter: ({ value }) => value ? value.toLocaleString() : 'Không có' },
    { field: 'taxPrice', headerName: 'Thuế (VND)', width: 150, valueFormatter: ({ value }) => value ? value.toLocaleString() : 'Không có' },
    { field: 'maxPeople', headerName: 'Số Người Tối Đa', width: 150 },
    {
      field: 'roomNumbers',
      headerName: 'Số Phòng & Ngày hết giá trị',
      width: 300,
      renderCell: (params) => (
        <div>
          {params.value ? params.value.map((roomNumber, index) => (
            <div key={index}>
              Phòng {roomNumber.number} - Ngày không có: {roomNumber.unavailableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}
            </div>
          )) : 'Không có dữ liệu'}
        </div>
      ),
    },
    { field: 'idAdmin', headerName: 'ID Admin', width: 150 },
    {
      field: 'action',
      headerName: 'Hành Động',
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <div className="viewButton" onClick={() => navigate(`/rooms/${params.row._id}`)}>Xem</div>
          <div className="deleteButton">Xóa</div>
        </div>
      ),
    },
  ];

  if (!rooms.length) return <div>Loading...</div>;

  return (
    <div className="roomlist-container">
      <Sidebar />
      <div className="roomlist-content">
        <h1>Danh Sách Phòng</h1>
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

export default RoomList;
