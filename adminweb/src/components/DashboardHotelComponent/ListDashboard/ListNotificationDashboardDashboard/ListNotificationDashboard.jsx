import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListNotificationDashboard.css';

const ListNotificationDashboard = () => {
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  const storedIdAdmin = localStorage.getItem("userId");
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/notifications/hotelAdmin/${storedIdAdmin}`);
        setNotification(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotification();
  }, []);

  const handleClickAdd = () => {
    navigate('/DashboardHotel/NewNotificationDashboard');
  };

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/notifications/${id}`);
      setNotification(notification.filter((notif) => notif._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRowClick = (params) => {
    navigate(`/DashboardHotel/SingleNotificationDashboard/${params.row._id}`);
  };

  const columns = [
    { field: 'user', headerName: 'Id người dùng', width: 290 },
    { field: 'message', headerName: 'Nội dung', width: 490 },
    { field: 'isRead', headerName: 'Đánh dấu đọc chưa', width: 190 },
    { field: 'idAdmin', headerName: 'Id quản lý khách sạn', width: 190 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button className='btnnoti' onClick={() => handleDeleteNotification(params.row._id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className='ListNotification'>
      <div className='ListNotificationCointainer'>
        <h2>Danh sách thông báo</h2>
        <div className='ListNotificationCointainerBtn' onClick={handleClickAdd}>
          <h3>Thêm thông báo</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%', marginLeft: '20px' }}>
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
          onRowClick={handleRowClick} 
        />
      </Box>
    </div>
  );
};

export default ListNotificationDashboard;
