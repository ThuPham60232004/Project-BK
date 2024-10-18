import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './ListHotel.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; 

const ListHotel = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/hotels/all');
        setHotels(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHotels();
  }, []);

  const handleRoom = (hotelId) => {
    navigate(`/SingleHotelRoom/${hotelId}`);
  };

  const handleClickAdd = () => {
    navigate('/NewHotels');
  };

  const handleDeleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/hotels/${id}`);
      setHotels(hotels.filter((hotel) => hotel._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const exportToExcel = () => {
    const dataForExcel = hotels.map((hotel) => ({
      'Tên khách sạn': hotel.name,
      'Loại khách sạn': hotel.type,
      'Thành phố': hotel.city,
      'Địa chỉ': hotel.address,
      'Khoảng cách': hotel.distance,
      'Tựa đề': hotel.title,
      'Mô tả': hotel.desc,
      'Đánh giá': hotel.rating,
      'Id Phòng': hotel.rooms,
      'Giá nhỏ nhất': hotel.cheapestPrice,
      'Loại đặc biệt': hotel.featured,
      'Id quản lý khách sạn': hotel.idAdmin,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách khách sạn");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(file, 'Danh_sach_khach_san.xlsx');
  };

  const columns = [
    { field: 'name', headerName: 'Tên khách sạn', width: 90 },
    { field: 'type', headerName: 'Loại khách sạn', width: 200 },
    { field: 'city', headerName: 'Thành phố', width: 150 },
    { field: 'address', headerName: 'Địa chỉ', width: 110 },
    { field: 'distance', headerName: 'Khoảng cách', width: 160 },
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
    { field: 'title', headerName: 'Tựa đề', width: 160 },
    { field: 'desc', headerName: 'Mô tả', width: 160 },
    { field: 'rating', headerName: 'Đánh giá', width: 160 },
    { field: 'rooms', headerName: 'Id Phòng', width: 160 },
    { field: 'cheapestPrice', headerName: 'Giá nhỏ nhất', width: 160 },
    { field: 'featured', headerName: 'Loại đặc biệt', width: 160 },
    { field: 'idAdmin', headerName: 'Id quản lý khách sạn', width: 160 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button className='btnhotels' onClick={() => handleDeleteHotel(params.row._id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className='ListHotel'>
      <div className='ListHotelCointainer'> 
        <h2>Danh sách khách sạn</h2>
        <div className='btnhotels'>
        <div className='ListHotelCointainerBtn' onClick={handleClickAdd}>
          <h3>Thêm khách sạn</h3>
        </div>
        <div className='ListHotelCointainerBtn'onClick={exportToExcel}>
        <h3>Xuất Excel</h3></div>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%', marginLeft: '20px' }}>
        <DataGrid
          rows={hotels}
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
          onRowClick={(params) => handleRoom(params.row._id)} 
        />
      </Box>
    </div>
  );
};

export default ListHotel;
