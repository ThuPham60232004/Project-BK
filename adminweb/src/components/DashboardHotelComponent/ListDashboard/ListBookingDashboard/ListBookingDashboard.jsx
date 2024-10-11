import React, { useState,useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './ListBookingDashboard.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const ListBookingDashboard = () => {

  const [bookings,setbookings]=useState([]);
  const navigate=useNavigate();
  const [addbookings,setAddbookings]='';

  const storedIdAdmin = localStorage.getItem("userId");
  useEffect(()=>{
    const fetchbookings=async()=>{
      try{
      const res= await axios.get(`http://localhost:9000/api/bookings/hotelAdmin/${storedIdAdmin}`);
      setbookings(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchbookings();
  },[]);

  const handleRoom=(BookingId)=>{
    navigate(`/SingleBooking${BookingId}`)
  }
  const handleClickAdd=()=>{
    navigate('/Newbookings')
  }
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
      headerName: 'Tổng giá ',
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
  ];
  
  
  return (
    <div className='ListBookingDashboard'>
      <div className='ListBookingCointainerDashboard'> 
        <h2>Danh sách đặt phòng</h2>
        <div className='ListBookingCointainerBtnDashboard' onClick={handleClickAdd}>
          <h3>Thêm đặt phòng</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%',marginLeft:'20px'}}>
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
        onRowClick={handleRoom}
      />
    </Box>
    </div>
  )
}

export default ListBookingDashboard