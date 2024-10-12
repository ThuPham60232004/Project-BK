import React, { useState,useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './ListHotel.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const ListHotel = () => {

  const [hotels,setHotels]=useState([]);
  const navigate=useNavigate();
  const [addHotels,setAddHotels]='';
  useEffect(()=>{
    const fetchHotels=async()=>{
      try{
      const res= await axios.get('http://localhost:9000/api/hotels/all');
      setHotels(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchHotels();
  },[]);

  const handleRoom = (hotelId) => {
    navigate(`/ListRoom/${hotelId}`);
  };
  
  
  const handleClickAdd=()=>{
    navigate('/NewHotels')
  }
  const columns = [
    { field: 'name', headerName: 'Tên khách sạn', width: 90 },
    {
      field: 'type',
      headerName: 'Loại khách sạn',
      width: 200,
    },
    {
      field: 'city',
      headerName: 'Thành phố',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      width: 110,
    },
    {
      field: 'distance',
      headerName: 'Khoảng cách',
      width: 160,
    },
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
    {
      field: 'title',
      headerName: 'Tựa đề',
      width: 160,
    },
    {
      field: 'desc',
      headerName: 'Mô tả',
      width: 160,
    },
    {
      field: 'rating',
      headerName: 'Đánh giá',
      width: 160,
    },
    {
      field: 'rooms',
      headerName: 'Id Phòng',
      width: 160,
    },
    {
      field: 'cheapestPrice',
      headerName: 'Giá nhỏ nhất',
      width: 160,
    },
    {
      field: 'featured',
      headerName: 'Loại đặc biệt',
      width: 160,
    },
    {
      field: 'idAdmin',
      headerName: 'Id quản lý khách sạn',
      width: 160,
    },
  ];
  
  
  return (
    <div className='ListHotel'>
      <div className='ListHotelCointainer'> 
        <h3>Danh sách khách sạn</h3>
        <div className='ListHotelCointainerBtn' onClick={handleClickAdd}>
          <h3>Thêm khách sạn</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%',marginLeft:'20px'}}>
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
        onRowClick={handleRoom}
      />
    </Box>
    </div>
  )
}

export default ListHotel