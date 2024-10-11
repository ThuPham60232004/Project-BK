import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './RevenueChartDashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RevenueChartDashboard = () => {
    const [bookingCount, setBookingCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [countByUser, setCountByUser] = useState([]);
    const [countByHotel, setCountByHotel] = useState([]);
    const [revenueByHotel, setRevenueByHotel] = useState([]);
    const [hotelsWithNoBookings, setHotelsWithNoBookings] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const startDateStr = moment(startDate).format('YYYY-MM-DD');
          const endDateStr = moment(endDate).format('YYYY-MM-DD');
  
          const countRes = await axios.get(`http://localhost:9000/api/bookings/statistics/booking-count?startDate=${startDateStr}&endDate=${endDateStr}`);
          setBookingCount(countRes.data.count);
  
          const revenueRes = await axios.get(`http://localhost:9000/api/bookings/statistics/total-revenue?startDate=${startDateStr}&endDate=${endDateStr}`);
          setTotalRevenue(revenueRes.data.totalRevenue);
  
          const countByUserRes = await axios.get(`http://localhost:9000/api/bookings/statistics/booking-count-by-user?startDate=${startDateStr}&endDate=${endDateStr}`);
          setCountByUser(countByUserRes.data);
  
          const countByHotelRes = await axios.get(`http://localhost:9000/api/bookings/statistics/booking-count-by-hotel?startDate=${startDateStr}&endDate=${endDateStr}`);
          setCountByHotel(countByHotelRes.data);
  
          const revenueByHotelRes = await axios.get(`http://localhost:9000/api/bookings/statistics/booking-revenue-hotel?startDate=${startDateStr}&endDate=${endDateStr}`);
          if (Array.isArray(revenueByHotelRes.data.revenueByHotel)) {
            console.log('Revenue by Hotel Data:', revenueByHotelRes.data.revenueByHotel); // Debugging line
            setRevenueByHotel(revenueByHotelRes.data.revenueByHotel);
          }
  
          const hotelsWithNoBookingsRes = await axios.get(`http://localhost:9000/api/bookings/statistics/hotel-no-booking?startDate=${startDateStr}&endDate=${endDateStr}`);
          setHotelsWithNoBookings(hotelsWithNoBookingsRes.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      if (startDate && endDate) {
        fetchData();
      }
    }, [startDate, endDate]);
  
    const userData = {
      labels: countByUser.map(user => `User ${user._id}`),
      datasets: [
        {
          label: 'Đặt theo người dùng',
          data: countByUser.map(user => user.count),
          backgroundColor: countByUser.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
          borderColor: countByUser.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
          borderWidth: 1,
        },
      ],
    };
  
    const hotelData = {
      labels: countByHotel.map(hotel => `Hotel ${hotel._id}`),
      datasets: [
        {
          label: 'Đặt khách sạn',
          data: countByHotel.map(hotel => hotel.count),
          backgroundColor: countByHotel.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
          borderColor: countByHotel.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
          borderWidth: 1,
        },
      ],
    };
  
    const revenueData = {
      labels: revenueByHotel.map(hotel => hotel._id?.name || 'Unknown'),
      datasets: [
        {
          label: 'Doanh thu khách sạn',
          data: revenueByHotel.map(hotel => hotel.totalRevenue),
          backgroundColor: revenueByHotel.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
          borderColor: revenueByHotel.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
            },
          },
        },
      },
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

        <div className="statsDashboard">
          <div className="statItemDashboard">
            <h2>Tổng số lượt đặt chỗ</h2>
            <p>{bookingCount}</p>
          </div>
          <div className="statItemDashboard">
            <h2>Tổng doanh thu</h2>
            <p>${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="statItemDashboard">
            <h2>Đặt chỗ theo người dùng</h2>
            <div className="chartContainerDashboard">
              <Bar data={userData} options={chartOptions} />
            </div>
          </div>
          <div className="statItemDashboard">
            <h2>Số lượng đặt phòng theo khách sạn</h2>
            <div className="chartContainerDashboard">
              <Pie data={hotelData} options={chartOptions} />
            </div>
          </div>
        </div>
        
        {hotelsWithNoBookings.length > 0 && (
          <div className="statItemDashboard">
            <h2>Khách sạn chưa có đặt phòng nào</h2>
            <ul>
              {hotelsWithNoBookings.map((hotel, index) => (
                <li key={index}>{hotel.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
  );
};

export default RevenueChartDashboard;
