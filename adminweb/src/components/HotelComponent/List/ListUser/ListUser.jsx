import React,{useState,useEffect} from 'react'
import './ListUser.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

const ListUser = () => {
  const [user,setUser]=useState([]);
  const navigate=useNavigate();
  const [addUser,setAddUser]='';

  const handleClickAdd=()=>{
    navigate('/NewUser')
  }
  const handleUser=(idUser)=>{
    navigate(`SingleUser${idUser}`)
  }
  useEffect(()=>{
    const fetchUser= async()=>{
    try{
        const res= await axios.get('http://localhost:9000/api/users/');
        setUser(res.data);
      
    }catch(err){
      console.error(err);
    }
  };fetchUser();
  },[])
  const columns=[
    {field:'username',headerName:'Tên người dùng',width:120},
    {field:'email',headerName:'email',width:120},
    {field:'country',headerName:'Đất nước',width:120},
    {field:'img',headerName:'Hình ảnh',width:120},
    {field:'city',headerName:'Thành phố',width:120},
    {field:'phone',headerName:'Số điện thoại',width:120},
    {field:'password',headerName:'Mật khẩu',width:120},
    {field:'CCCD',headerName:'Căn cước công dân',width:120},
    {field:'isAdmin',headerName:'Id quản lý',width:120},
    {field:'role',headerName:'Phân quyền',width:120},
  ]
  return (
    <div className='ListUser'>
      <div className='ListUserCointainer'> 
        <h1>Danh sách khách sạn</h1>
        <div className='ListUserCointainerBtn' onClick={handleClickAdd}>
          <h3>Thêm khách sạn</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%',marginLeft:'20px'}}>
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
        onRowClick={handleUser}
      />
    </Box>
    </div>
  )
}

export default ListUser