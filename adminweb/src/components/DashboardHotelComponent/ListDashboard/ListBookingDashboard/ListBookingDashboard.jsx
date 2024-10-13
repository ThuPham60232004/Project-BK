import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './ListBookingDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListBookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const navigate = useNavigate();
  const storedIdAdmin = localStorage.getItem("userId");

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
  }, [storedIdAdmin]);

  useEffect(() => {
    const fetchBookingsByHotel = async () => {
      if (selectedHotelId) {
        try {
          const res = await axios.get(`http://localhost:9000/api/bookings/getbyhotel/${selectedHotelId}`);
          setBookings(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setBookings([]);
      }
    };
    fetchBookingsByHotel();
  }, [selectedHotelId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = (params) => {
    navigate(`/DashboardHotel/SingleBookingDashboard/${params.row._id}`);
  };

  const handleHotelChange = (params) => {
    setSelectedHotelId(params.row._id);
  };

  const columnsHotels = [
    { field: 'name', headerName: 'Tên khách sạn', width: 150 },
    { field: 'type', headerName: 'Loại khách sạn', width: 200 },
    { field: 'city', headerName: 'Thành phố', width: 150 },
    { field: 'address', headerName: 'Địa chỉ', width: 110 },
    { field: 'rating', headerName: 'Đánh giá', width: 160 },
    { field: 'cheapestPrice', headerName: 'Giá nhỏ nhất', width: 160 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button className="selectHotelButton" onClick={() => handleHotelChange(params)}>Chọn khách sạn</button>
      ),
    },
  ];

  const columnsBookings = [
    { field: 'user', headerName: 'Id người dùng', width: 90 },
    { field: 'hotel', headerName: 'Id khách sạn', width: 200 },
    { field: 'room', headerName: 'Id phòng', width: 150 },
    { field: 'startDate', headerName: 'Ngày bắt đầu', width: 110 },
    { field: 'endDate', headerName: 'Ngày kết thúc', width: 160 },
    { field: 'paymentMethod', headerName: 'Phương thức thanh toán', width: 100 },
    { field: 'status', headerName: 'Trạng thái', width: 160 },
    { field: 'totalPrice', headerName: 'Tổng giá', width: 160 },
    { field: 'checkintime', headerName: 'Thời gian checkin', width: 160 },
    { field: 'Booking_deposit', headerName: 'Tiền cọc', width: 160 },
    { field: 'idAdmin', headerName: 'Id quản lý khách sạn', width: 160 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button className="deleteBookingButton" onClick={() => handleDelete(params.row._id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className='listBookingWrapper'>
      <div className='listBookingHeader'>
        <h2 className='listBookingTitle'>Danh sách đặt phòng</h2>
      </div>

      <Box sx={{ height: '400px', width: '97%', marginLeft: '20px' }}>
        <DataGrid
          rows={hotels}
          columns={columnsHotels}
          getRowId={(row) => row._id}
          pageSizeOptions={[5]}
          checkboxSelection
          sx={{ border: 'none' }}
        />
      </Box>
      <br/>
      <br/>
      {selectedHotelId && (
        <>
          <h3 className='textbooking'>Danh sách đặt phòng</h3>
          <br/>
          <Box sx={{ height: '800px', width: '97%', marginLeft: '20px' }}>
            <DataGrid
              rows={bookings}
              columns={columnsBookings}
              getRowId={(row) => row._id}
              pageSizeOptions={[13]}
              checkboxSelection
              onRowClick={handleRowClick}
              sx={{ border: 'none' }}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default ListBookingDashboard;
