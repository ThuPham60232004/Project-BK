import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import './BookingStatistics.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

const BookingStatistics = () => {
  const [countByUser, setCountByUser] = useState([]);
  const [countByHotel, setCountByHotel] = useState([]);
  const [revenueByHotel, setRevenueByHotel] = useState([]);
  const [bookingDays, setBookingDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const countByUserRes = await axios.get('http://localhost:9000/api/bookings/statistics/getBookingCountByUserAllTime');
        setCountByUser(countByUserRes.data);

        const countByHotelRes = await axios.get('http://localhost:9000/api/bookings/statistics/getBookingCountByHotelAllTime');
        setCountByHotel(countByHotelRes.data);

        const revenueByHotelRes = await axios.get('http://localhost:9000/api/bookings/statistics/getRevenueByHotelAllTime');
        setRevenueByHotel(revenueByHotelRes.data);

        const bookingDaysRes = await axios.get('http://localhost:9000/api/bookings/statistics/getBookingDays');
        setBookingDays(bookingDaysRes.data);


      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return 'Ngày không hợp lệ';
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const userData = {
    labels: countByUser.map(user => `${user.username}`), 
    datasets: [
      {
        label: 'Số lượng đặt phòng theo người dùng',
        data: countByUser.map(user => user.count),
        backgroundColor: countByUser.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
        borderColor: countByUser.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
        borderWidth: 1,
      },
    ],
  };
  

  const hotelData = {
    labels: countByHotel.map(hotel => `${hotel.hotelName}`), 
    datasets: [
      {
        label: 'Số lượng đặt phòng theo khách sạn',
        data: countByHotel.map(hotel => hotel.count),
        backgroundColor: countByHotel.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
        borderColor: countByHotel.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const revenueData = {
    labels: revenueByHotel.map(hotel => hotel._id?.name || 'Không xác định'),
    datasets: [
      {
        label: 'Doanh thu theo khách sạn',
        data: revenueByHotel.map(hotel => hotel.totalRevenue),
        backgroundColor: revenueByHotel.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
        borderColor: revenueByHotel.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Doanh thu dự kiến',
        data: revenueByHotel.map(hotel => hotel.projectedRevenue || 0), 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'line',
      },
    ],
  };
  

  const dailyBookingsData = {
    labels: bookingDays.map(day => `${day._id.day}/${day._id.month}/${day._id.year}`),
    datasets: [
      {
        label: 'Đặt phòng hàng ngày',
        data: bookingDays.map(day => day.count),
        backgroundColor: bookingDays.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
        borderColor: bookingDays.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
        borderWidth: 1,
        fill: true,
      },
    ],
  };  

  return (
    <div className="bookingStatistics-home">
      <div className="stats-home">
       <div className='stats-statItem1-home'>
       <div className="statItem-home">
          <h2>Số lượng đặt phòng theo người dùng</h2>
          <div className="chartContainer-home">
            <Bar data={userData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="statItem-home">
          <h2>Số lượng đặt phòng theo khách sạn</h2>
          <div className="chartContainer-home">
            <Line data={hotelData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        </div>
        <div className='stats-statItem2-home'>
        <div className="statItem-home">
          <h2>Doanh thu theo khách sạn</h2>
          <div className="chartContainer-home">
            <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
       </div>
        <div className="statItem-home">
          <h2>Ngày có lượng đặt nhiều nhất</h2>
          <div className="chartContainer-home">
            <Line data={dailyBookingsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatistics;
