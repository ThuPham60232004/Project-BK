import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './ListReviewDashboard.css'
const ListReviewDashboard = () => {
  const [review,setReview]=useState([]);
  const storedIdAdmin = localStorage.getItem("userId");
  const [addReview,setAddReview]=''
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchReview=async()=>{
    try{
        const res= await axios.get(`http://localhost:9000/api/reviews/hotelAdmin/${storedIdAdmin}`);
        setReview(res.data);
    }
    catch(err){
      console.error(err);
    }
  };fetchReview();
  },[])
  const columns=[
    {field:'userId',headerName:'Id người dùng',width:250},
    {field:'hotelId',headerName:'Id khách sạn',width:250},
    {field:'roomId',headerName:'Id phòng',width:250},
    {field:'rating',headerName:'Đáng giá sao',width:100},
    {field:'comment',headerName:'Nội dung đánh giá',width:200},
    {field:'idAdmin',headerName:'Id quản lý',width:200},
  ]

  const handleClickAdd=()=>{
    navigate('/NewReview')
  }
  const handleReview=(idReview)=>{
    navigate(`SingleReview${idReview}`)
  }
  return (
    <div className='ListReviewDashboard'>
    <div className='ListReviewCointainerDashboard'> 
      <h2>Danh sách bình luận</h2>
      <div className='ListReviewCointainerBtnDashboard' onClick={handleClickAdd}>
        <h3>Thêm bình luận</h3>
      </div>
    </div>
    <Box sx={{ height: '800px', width: '97%',marginLeft:'20px'}}>
    <DataGrid
      rows={review}
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
      onRowClick={handleReview}
    />
  </Box>
  </div>
  )
}

export default ListReviewDashboard