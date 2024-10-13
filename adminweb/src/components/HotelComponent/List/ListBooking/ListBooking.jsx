import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './ListBooking.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListBooking = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/bookings/`);
        setBookings(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookings();
  }, []);

  const handleClickAdd = () => {
    navigate('/NewBookings');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id)); 
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = (params) => {
    navigate(`/SingleBooking/${params.row._id}`); 
  };

  const columns = [
    { field: 'user', headerName: 'Id người dùng', width: 90 },
    {
      field: 'Booking',
      headerName: 'Id khách sạn',
      width: 200,
    },
    {
      field: 'room',
      headerName: 'Id phòng',
      width: 150,
    },
    {
      field: 'startDate',
      headerName: 'Ngày kết thúc',
      width: 110,
    },
    {
      field: 'endDate',
      headerName: 'Ngày bắt đầu',
      width: 160,
    },
    {
      field: 'paymentMethod',
      headerName: 'Phương thức thanh toán',
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 160,
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng giá',
      width: 160,
    },
    {
      field: 'checkintime',
      headerName: 'Thời gian checkin',
      width: 160,
    },
    {
      field: 'Booking_deposit',
      headerName: 'Tiền cọc',
      width: 160,
    },
    {
      field: 'idAdmin',
      headerName: 'Id quản lý khách sạn',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row._id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className='ListBooking'>
      <div className='ListBookingContainerDashboard'>
        <h2>Danh sách đặt phòng</h2>
        <div className='ListBookingContainerBtnDashboard' onClick={handleClickAdd}>
          <h3>Thêm đặt phòng</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%', marginLeft: '20px' }}>
        <DataGrid
          rows={bookings}
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
          onRowClick={handleRowClick}
          sx={{ border: 'none' }}
        />
      </Box>
    </div>
  );
};

export default ListBooking;
