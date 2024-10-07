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
        const res= await axios.get('http:/localhost:9000/api/user/');
        setUser(res.data);
      
    }catch(err){
      console.error(err);
    }
  };fetchUser();
  },[])
  const columns=[
    {field:'username',headerName:'',width:120},
    {field:'email',headerName:'email',width:120},
    {field:'country',headerName:'',width:120},
    {field:'img',headerName:'',width:120},
    {field:'city',headerName:'',width:120},
    {field:'phone',headerName:'',width:120},
    {field:'password',headerName:'',width:120},
    {field:'CCCD',headerName:'',width:120},
    {field:'isAdmin',headerName:'',width:120},
    {field:'role',headerName:'',width:120},
    {field:'passportNumber',headerName:'',width:120},
    {field:'passengerName',headerName:'',width:120},
    {field:'passwordResetExpires',headerName:'',width:120}
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