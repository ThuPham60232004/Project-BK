
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../../components/sidebar/Sidebar';
import './selecthotel.css';
const storedIdAdmin = localStorage.getItem("userId");
const SelectHotel = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/hotels/hotelAdmin/${storedIdAdmin}`);
        setHotels(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHotels();
  }, []);

  const handleSelectHotel = (hotelId) => {
    navigate(`/roo/${hotelId}`);
  };

  const columns = [
    { field: 'name', headerName: 'Tên Khách Sạn', width: 200 },
    { field: 'type', headerName: 'Loại Khách Sạn', width: 150 },
    { field: 'city', headerName: 'Thành Phố', width: 150 },
    { field: 'address', headerName: 'Địa Chỉ', width: 200 },
    { field: 'distance', headerName: 'Khoảng Cách', width: 150 },
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
    { field: 'title', headerName: 'Tiêu Đề', width: 200 },
    { field: 'desc', headerName: 'Mô Tả', width: 300 },
    { field: 'rating', headerName: 'Đánh Giá', width: 150 },
    { field: 'cheapestPrice', headerName: 'Giá Thấp Nhất (VND)', width: 200 },
    { field: 'featured', headerName: 'Nổi Bật', width: 150, renderCell: (params) => (params.value ? 'Có' : 'Không') },
    { field: 'idAdmin', headerName: 'ID Admin', width: 150 },
    {
      field: 'action',
      headerName: 'Chọn',
      width: 150,
      renderCell: (params) => (
        <div className="cellAction">
          <button
            className="selectButton"
            onClick={() => handleSelectHotel(params)}
          >
            Chọn
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="selecthotel-container">
      <Sidebar />
      <div className="selecthotel-content">
        <h1>Chọn Khách Sạn</h1>
        <DataGrid
          rows={hotels}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
          onRowClick={handleSelectHotel}
        />
      </div>
    </div>
  );
};

export default SelectHotel;
