import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './ListDiscountCodeDashboard.css';
import {useNavigate} from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
const ListDiscountCodeDashboard = () => {
  const navigate =useNavigate();
  const [discountCode,setDiscountCode]=useState([]);
  const [addDiscountCode,setAddDiscountCode]='';
  const handleDiscountCode=(Iddiscountcoder)=>{
    navigate(`/NewDiscountCode${Iddiscountcoder}`)
  }
  const handleAddDiscountCode=()=>{
    navigate('/SingleDiscountCode')
  }
  const storedIdAdmin = localStorage.getItem("userId");
  useEffect(()=>{
    const fetchDiscountCode= async()=>{
      try{
        const res= await axios.get(`http://localhost:9000/api/discounts/hotelAdmin/${storedIdAdmin}`);
        setDiscountCode(res.data);
      }
      catch(err)
      {
        console.error(err);
      }
    };fetchDiscountCode();
  },[]);
  const columns=[
    {field:'code',headerName:'Mã code',width:190},
    {field:'discountType',headerName:'Loại mã giảm giá',width:190},
    {field:'discountValue',headerName:'Giá trị mã giảm giá',width:190},
    {field:'startDate',headerName:'Ngày bắt đầu',width:290},
    {field:'expirationDate',headerName:'Ngày hết hạn',width:290},
    {field:'amountDiscountCode',headerName:'Số lượng mã giảm giá',width:190},
    {field:'idAdmin',headerName:'Id quản lý',width:190},
  ]
  return (
    <div className='ListDiscountCodeDashboard'>
  <div className='ListDiscountCodeCointainerDashboard'> 
        <h2>Danh sách khách sạn</h2>
        <div className='ListDiscountCodeCointainerBtnDashboard' onClick={handleAddDiscountCode}>
          <h3>Thêm mã giảm giá</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%',marginLeft:'20px'}}>
      <DataGrid
        rows={discountCode}
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
        onRowClick={handleDiscountCode}
      />
    </Box>
    </div>
  )
}

export default ListDiscountCodeDashboard