import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListRoomDashboard.css';

const ListRoomDashboard = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const storedIdAdmin = localStorage.getItem("userId");
  const handleClickAdd = () => {
    navigate('/DashboardHotel/NewRoomsDashboard');
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/hotels/hotelAdmin/${storedIdAdmin}`);
        setHotels(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedHotelId) {
        try {
          const res = await axios.get(`http://localhost:9000/api/hotels/room/${selectedHotelId}`);
          setRooms(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setRooms([]); 
      }
    };
    fetchRooms();
  }, [selectedHotelId]);

  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:9000/api/rooms/${roomId}/${selectedHotelId}`);
      setRooms(rooms.filter((room) => room._id !== roomId)); 
    } catch (err) {
      console.error(err);
    }
  };

  const columnsHotels = [
    { field: 'name', headerName: 'Tên khách sạn', width: 150 },
    { field: 'type', headerName: 'Loại khách sạn', width: 200 },
    { field: 'city', headerName: 'Thành phố', width: 150 },
    { field: 'address', headerName: 'Địa chỉ', width: 110 },
    {
      field: 'photos',
      headerName: 'Ảnh',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value[0] || 'https://via.placeholder.com/100'}
          alt="Hotel"
          style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
        />
      ),
    },
    { field: 'rating', headerName: 'Đánh giá', width: 160 },
    { field: 'cheapestPrice', headerName: 'Giá nhỏ nhất', width: 160 },
  ];

  const columnsRooms = [
    { field: 'title', headerName: 'Tên Phòng', width: 200 },
    { field: 'desc', headerName: 'Mô Tả', width: 250 },
    { field: 'price', headerName: 'Giá (VND)', width: 150 },
    { field: 'discountPrice', headerName: 'Giá Giảm', width: 150 },
    { field: 'taxPrice', headerName: 'Giá Thuế', width: 150 },
    { field: 'maxPeople', headerName: 'Số Người Tối Đa', width: 150 },
    { field: 'rating', headerName: 'Đánh giá sao', width: 150 },
    { field: 'numberOfReviews', headerName: 'Số Đánh Giá', width: 150 },
    { field: 'availability', headerName: 'Tình Trạng', width: 150, renderCell: (params) => (params.value ? 'Còn Trống' : 'Đã Đặt') },
    { field: 'category', headerName: 'Danh Mục', width: 200 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button className='btnmmm' onClick={() => handleDeleteRoom(params.row._id)}>Xóa</button>
      ),
    },
  ];
  

  if (!hotels.length) return <div>Loading hotels...</div>;

  return (
    <div className="roomlist-container">
      <div className="roomlist-content">
        <div className='roomlist-content-header'>
          <h2>Danh Sách Phòng</h2>
          <div className='ListRoomCointainerBtn' onClick={handleClickAdd}>
            <h3>Thêm Phòng</h3>
          </div>
        </div>
        <Box sx={{ height: '400px', width: '100%', marginBottom: '20px' }}>
          <DataGrid
            rows={hotels}
            columns={columnsHotels}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row._id}
            onRowClick={(params) => {
              setSelectedHotelId(params.row._id); 
              setRooms([]);
            }}
          />
        </Box>

        {selectedHotelId && (
          <>
            <h3>Danh Sách Phòng</h3>
            <Box sx={{ height: '400px', width: '100%' }}>
            <DataGrid
              rows={rooms}
              columns={columnsRooms}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row._id}
              onRowClick={(params) => {
                navigate(`/DashboardHotel/SingleRoomDashboard/${params.row._id}`); 
              }}
            />
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default ListRoomDashboard;
