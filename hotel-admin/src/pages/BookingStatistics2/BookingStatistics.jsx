import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingStatistics.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BookingStatistics1 = () => {
  const [bookingCount, setBookingCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [countByUser, setCountByUser] = useState([]);
  const [countByHotel, setCountByHotel] = useState([]);
  const [revenueByHotel, setRevenueByHotel] = useState([]);
  const [highestRevenueHotel, setHighestRevenueHotel] = useState({});
  const [lowestRevenueHotel, setLowestRevenueHotel] = useState({});
  const [hotelsWithNoBookings, setHotelsWithNoBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateStr = moment(selectedDate).format('YYYY-MM-DD');

        const countRes = await axios.get(`http://localhost:9000/api/bookings/statistics/booking-count?date=${dateStr}`);
        setBookingCount(countRes.data.count);

        const revenueRes = await axios.get(`http://localhost:9000/api/bookings/statistics/total-revenue?date=${dateStr}`);
        setTotalRevenue(revenueRes.data.totalRevenue);

        const countByUserRes = await axios.get(`http://localhost:9000/api/bookings/statistics/booking-count-by-user?date=${dateStr}`);
        setCountByUser(countByUserRes.data);

        const countByHotelRes = await axios.get(`http://localhost:9000/api/bookings/statistics/booking-count-by-hotel?date=${dateStr}`);
        setCountByHotel(countByHotelRes.data);

        const revenueByHotelRes = await axios.get(`http://localhost:9000/api/bookings/statistics/booking-revenue-hotel?date=${dateStr}`);
        if (Array.isArray(revenueByHotelRes.data.revenueByHotel)) {
          console.log('Revenue by Hotel Data:', revenueByHotelRes.data.revenueByHotel); // Debugging line
          setRevenueByHotel(revenueByHotelRes.data.revenueByHotel);

          if (revenueByHotelRes.data.revenueByHotel.length > 0) {
            setHighestRevenueHotel(revenueByHotelRes.data.highestRevenueHotel);
            setLowestRevenueHotel(revenueByHotelRes.data.lowestRevenueHotel);
          }
        }

        const hotelsWithNoBookingsRes = await axios.get(`http://localhost:9000/api/bookings/statistics/hotel-no-booking?date=${dateStr}`);
        setHotelsWithNoBookings(hotelsWithNoBookingsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedDate]);

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
    <div className="bookingStatistics">
      <h1 className='hehhe'>THỐNG KÊ ĐẶT PHÒNG</h1>

      <div className="datePickerContainer">
        <label>Chọn ngày:</label>
        <DatePicker 
          selected={selectedDate} 
          onChange={(date) => setSelectedDate(date)} 
          dateFormat="yyyy-MM-dd" 
        />
      </div>

      <div className="stats">
        <div className="statItem">
          <h2>Tổng số lượt đặt chỗ</h2>
          <p>{bookingCount}</p>
        </div>
        <div className="statItem">
          <h2>Tổng doanh thu</h2>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="statItem">
          <h2>Đặt chỗ theo người dùng</h2>
          <div className="chartContainer">
            <Bar data={userData} options={chartOptions} />
          </div>
        </div>
        <div className="statItem">
          <h2>Số lượng đặt phòng theo khách sạn</h2>
          <div className="chartContainer">
            <Pie data={hotelData} options={chartOptions} />
          </div>
        </div>
      </div>
      {hotelsWithNoBookings.length > 0 && (
        <div className="statItem">
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

export default BookingStatistics1;
