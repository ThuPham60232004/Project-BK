import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './RevenueChartDashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RevenueChartDashboard = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const startDateStr = moment(startDate).format('YYYY-MM-DD');
          const endDateStr = moment(endDate).format('YYYY-MM-DD');
          const idAdmin = localStorage.getItem("userId"); 

          const revenueRes = await axios.get(`http://localhost:9000/api/bookings/getRevenueByAdmin/${idAdmin}?startDate=${startDateStr}&endDate=${endDateStr}`);
          setTotalRevenue(revenueRes.data.totalRevenue);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      if (startDate && endDate) {
        fetchData();
      }
    }, [startDate, endDate]);

    // Hàm định dạng số tiền Việt Nam Đồng
    const formatCurrency = (amount) => {
      return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
      <div className="bookingStatisticsDashboard">
        <h1 className="hehheDashboard">THỐNG KÊ ĐẶT PHÒNG</h1>

        <div className="datePickerContainerDashboard">
          <label>Chọn ngày bắt đầu:</label>
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            dateFormat="yyyy-MM-dd" 
          />
          <label>Chọn ngày kết thúc:</label>
          <DatePicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)} 
            dateFormat="yyyy-MM-dd" 
          />
        </div>
        <div className="statItemDashboard">
          <h2>Tổng doanh thu</h2>
          <p>{formatCurrency(totalRevenue)}</p>
        </div>
      </div>
    );
};

export default RevenueChartDashboard;
