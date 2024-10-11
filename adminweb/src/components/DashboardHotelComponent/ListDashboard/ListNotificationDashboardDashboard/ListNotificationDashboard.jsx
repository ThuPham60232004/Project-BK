import React, { useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListNotificationDashboard.css'
const ListNotificationDashboard = () => {
const [notification,setNotification]=useState([]);
  const navigate=useNavigate();
  const [addNotification, setAddNotification]='';
  const storedIdAdmin = localStorage.getItem("userId");
  useEffect(()=>{
    const fetchNotification=async()=>{
      try{
        const res= await axios.get(`http://localhost:9000/api/notifications/hotelAdmin/${storedIdAdmin}`);
        setNotification(res.data);
      }catch(err)
      {
        console.error(err);
      }
    };
    fetchNotification();
  },[]);
  const handleNotification=(notificationId)=>{
    navigate(`/SingleNotification${notificationId}`)
  }
  const handleClickAdd=()=>{
    navigate('/')
  }
  const columns=[
    { field: 'user', headerName: 'Id người dùng', width: 290 },
    { field: 'message', headerName: 'Nội dung', width: 490 },
    { field: 'isRead', headerName: 'Đánh dấu đọc chưa', width: 190 },
    { field: 'idAdmin', headerName: 'Id quản lý khách sạn', width: 190 },
  ]
  return (
    <div className='ListNotificationDashboard'>
      <div className='ListNotificationCointainerDashboard'>
      <h2>Danh sách thông báo</h2>
        <div className='ListNotificationCointainerBtnDashboard' onClick={handleClickAdd}>
          <h3>Thêm thông báo</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%',marginLeft:'20px'}}>
      <DataGrid
        rows={notification}
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
        onRowClick={handleNotification}
      />
    </Box>
    </div>
  )
}

export default ListNotificationDashboard