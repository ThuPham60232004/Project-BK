import React, { useState, useEffect } from 'react';
import './ListUser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; 

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


  const exportToExcel = () => {
    const dataForExcel = user.map((u) => ({
      'Tên người dùng': u.username,
      'Email': u.email,
      'Đất nước': u.country,
      'Thành phố': u.city,
      'Số điện thoại': u.phone,
      'Phân quyền': u.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách người dùng");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(file, 'Danh_sach_nguoi_dung.xlsx'); 
  };

  const columns = [
    { field: 'username', headerName: 'Tên người dùng', width: 150 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'country', headerName: 'Đất nước', width: 120 },
    { field: 'city', headerName: 'Thành phố', width: 120 },
    { field: 'phone', headerName: 'Số điện thoại', width: 120 },
    { field: 'role', headerName: 'Phân quyền', width: 120 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button className="deleteButton" onClick={() => handleDeleteUser(params.row._id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className='ListUser'>
      <div className='ListUserContainer'> 
        <h1>Danh sách người dùng</h1>
       <div className='btnuser'>
       <div className='ListUserContainerBtn' onClick={handleClickAdd}>
          <h3>Thêm người dùng</h3>
        </div>
        <div className='ListUserContainerBtn' onClick={exportToExcel} disabled={!user.length}>
          <h3>Xuất Excel</h3></div> 
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
          pageSizeOptions={[15]}
          checkboxSelection
          onRowClick={(params) => handleUser(params)}
        />
      </Box>
    </div>
  );
}

export default ListUser;
