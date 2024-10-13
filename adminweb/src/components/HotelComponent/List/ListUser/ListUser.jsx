import React, { useState, useEffect } from 'react';
import './ListUser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ListUser = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  
  const handleClickAdd = () => {
    navigate('/NewUser');
  };

  const handleUser = (params) => {
    navigate(`/SingleUser/${params.row._id}`); 
};

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/users/');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/users/${id}`);
      setUser(user.filter((u) => u._id !== id)); 
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: 'username', headerName: 'Tên người dùng', width: 120 },
    { field: 'email', headerName: 'Email', width: 120 },
    { field: 'country', headerName: 'Đất nước', width: 120 },
    { field: 'img', headerName: 'Hình ảnh', width: 120 },
    { field: 'city', headerName: 'Thành phố', width: 120 },
    { field: 'phone', headerName: 'Số điện thoại', width: 120 },
    { field: 'password', headerName: 'Mật khẩu', width: 120 },
    { field: 'CCCD', headerName: 'Căn cước công dân', width: 120 },
    { field: 'isAdmin', headerName: 'Id quản lý', width: 120 },
    { field: 'role', headerName: 'Phân quyền', width: 120 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleDeleteUser(params.row._id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className='ListUser'>
      <div className='ListUserCointainer'> 
        <h1>Danh sách người dùng</h1>
        <div className='ListUserCointainerBtn' onClick={handleClickAdd}>
          <h3>Thêm người dùng</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%', marginLeft: '20px' }}>
      <DataGrid
          rows={user}
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
          onRowClick={(params) => handleUser(params)} // Truyền params vào handleUser
      />

      </Box>
    </div>
  );
}

export default ListUser;
