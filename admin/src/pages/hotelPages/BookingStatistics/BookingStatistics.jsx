import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2'; // Giữ lại import này cho ChartJS
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import './BookingStatistics.css';

// Đăng ký các thành phần của ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

const BookingStatistics = () => {
  const [bookingCount, setBookingCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [countByUser, setCountByUser] = useState([]);
  const [countByHotel, setCountByHotel] = useState([]);
  const [revenueByHotel, setRevenueByHotel] = useState([]);
  const [bookingDays, setBookingDays] = useState([]);
  const [mostBookedDay, setMostBookedDay] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countRes = await axios.get('http://localhost:9000/api/bookings/statistics/getTotalBookings');
        setBookingCount(countRes.data.count);

        const revenueRes = await axios.get('http://localhost:9000/api/bookings/statistics/getTotalRevenueAllTime');
        setTotalRevenue(revenueRes.data.totalRevenue);

        const countByUserRes = await axios.get('http://localhost:9000/api/bookings/statistics/getBookingCountByUserAllTime');
        setCountByUser(countByUserRes.data);

        const countByHotelRes = await axios.get('http://localhost:9000/api/bookings/statistics/getBookingCountByHotelAllTime');
        setCountByHotel(countByHotelRes.data);

        const revenueByHotelRes = await axios.get('http://localhost:9000/api/bookings/statistics/getRevenueByHotelAllTime');
        setRevenueByHotel(revenueByHotelRes.data);

        const bookingDaysRes = await axios.get('http://localhost:9000/api/bookings/statistics/getBookingDays');
        setBookingDays(bookingDaysRes.data);

        const mostBookedDayRes = await axios.get('http://localhost:9000/api/bookings/statistics/getMostBookedDay');
        setMostBookedDay(mostBookedDayRes.data);

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
    labels: countByUser.map(user => `Người dùng ${user._id}`),
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
    labels: countByHotel.map(hotel => `Khách sạn ${hotel._id}`),
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
        data: revenueByHotel.map(hotel => hotel.projectedRevenue || 0), // Ví dụ dữ liệu bổ sung
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'line',
      },
    ],
  };

  const dailyBookingsData = {
    labels: bookingDays.map(day => formatDate(day.date)),
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
    <div className="bookingStatistics">
      <h1 className="hehhe">Thống kê đặt phòng</h1>

      <div className="stats">
        <div className="statItem">
          <h2>Tổng số đặt phòng</h2>
          <p>{bookingCount}</p>
        </div>
        <div className="statItem">
          <h2>Tổng doanh thu</h2>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="statItem">
          <h2>Số lượng đặt phòng theo người dùng</h2>
          <div className="chartContainer">
            <Bar data={userData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="statItem">
          <h2>Số lượng đặt phòng theo khách sạn</h2>
          <div className="chartContainer">
            <Line data={hotelData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="statItem">
          <h2>Doanh thu theo khách sạn</h2>
          <div className="chartContainer">
            <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="statItem">
          <h2>Ngày có lượng đặt nhiều nhất</h2>
          <div className="chartContainer">
            <Line data={dailyBookingsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatistics;
