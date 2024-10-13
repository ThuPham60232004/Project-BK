import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListDiscountCode.css';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ListDiscountCode = () => {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState([]);

  const handleAddDiscountCode = () => {
    navigate('/NewDiscountCode');
  };
  const handleRowClick = (params) => {
    console.log(params);  
    navigate(`/SingleDiscountCode/${params.row._id}`);
  };
  
  
  const handleDeleteDiscountCode = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/discounts/${id}`);
      setDiscountCode(discountCode.filter((code) => code._id !== id)); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchDiscountCode = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/discounts/');
        setDiscountCode(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDiscountCode();
  }, []);

  const columns = [
    { field: 'code', headerName: 'Mã code', width: 190 },
    { field: 'discountType', headerName: 'Loại mã giảm giá', width: 190 },
    { field: 'discountValue', headerName: 'Giá trị mã giảm giá', width: 190 },
    { field: 'startDate', headerName: 'Ngày bắt đầu', width: 290 },
    { field: 'expirationDate', headerName: 'Ngày hết hạn', width: 290 },
    { field: 'amountDiscountCode', headerName: 'Số lượng mã giảm giá', width: 190 },
    { field: 'idAdmin', headerName: 'Id quản lý', width: 190 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <button className='btndiscountcode' onClick={() => handleDeleteDiscountCode(params.row._id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div className='ListDiscountCode'>
      <div className='ListDiscountCodeCointainer'>
        <h1>Danh sách mã giảm giá</h1>
        <div className='ListDiscountCodeCointainerBtn' onClick={handleAddDiscountCode}>
          <h3>Thêm mã giảm giá</h3>
        </div>
      </div>
      <Box sx={{ height: '800px', width: '97%', marginLeft: '20px' }}>
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
          onRowClick={handleRowClick}
          sx={{ border: 'none' }}
          disableSelectionOnClick  
        />
      </Box>

    </div>
  );
};

export default ListDiscountCode;
