import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './ListBooking.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver'; 

const ListBooking = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };

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
        <button className="deleteBookingButton" onClick={() => handleDelete(params.row._id)}>Xóa</button>
      ),
    },
  ];

  const exportToExcel = () => {
    const dataForExcel = bookings.map((booking) => ({
      'Id người dùng': booking.user,
      'Id khách sạn': booking.Booking,
      'Id phòng': booking.room,
      'Ngày bắt đầu': booking.startDate,
      'Ngày kết thúc': booking.endDate,
      'Phương thức thanh toán': booking.paymentMethod,
      'Trạng thái': booking.status,
      'Tổng giá': booking.totalPrice,
      'Thời gian checkin': booking.checkintime,
      'Tiền cọc': booking.Booking_deposit,
      'Id quản lý khách sạn': booking.idAdmin,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách đặt phòng");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(file, 'Danh_sach_dat_phong.xlsx');
  };

  return (
    <div className='listBookingWrapper'>
      <div className='listBookingHeader'>
        <h2 className='listBookingTitle'>Danh sách đặt phòng</h2>
       <div className='buttonbooking'>
        <div className='addBookingButton' onClick={handleClickAdd}>
            <h3>Thêm đặt phòng</h3>
          </div>
          <div className='addBookingButton' onClick={exportToExcel}>
            <h3>Xuất Excel</h3>
          </div> 
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
