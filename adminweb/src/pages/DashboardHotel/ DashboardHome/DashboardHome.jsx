import React, { useEffect, useState } from 'react';
import './DashboardHome.css';
import { BsCoin } from "react-icons/bs";
import { PiCoinBold } from "react-icons/pi";
import { CiWallet } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import BookingStatistics from '../../../components/HotelComponent/Chart/BookingStatistics/BookingStatistics';

const DashboardHome2 = () => {
    const [approvedRevenue, setApprovedRevenue] = useState(0);
    const [pendingRevenue, setPendingRevenue] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [users, setUsers] = useState([]);
  
    
    const [hotelPage, setHotelPage] = useState(1);
    const [userPage, setUserPage] = useState(1);
    const itemsPerPage = 5;
  
    
    const fetchRevenueData = async () => {
      try {
        const approvedResponse = await fetch('http://localhost:9000/api/bookings/statistics/getTotalRevenueAllTime');
        const pendingResponse = await fetch('http://localhost:9000/api/bookings/statistics/getTotalRevenuePending');
        const approvedData = await approvedResponse.json();
        const pendingData = await pendingResponse.json();
    
        setApprovedRevenue(approvedData.totalRevenue);
        setPendingRevenue(pendingData.totalRevenue);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };
  
    const fetchUserAndBookingCounts = async () => {
      try {
        const userResponse = await fetch('http://localhost:9000/api/users/countUsers');
        const bookingResponse = await fetch('http://localhost:9000/api/bookings/countBookings');
        const userData = await userResponse.json();
        const bookingData = await bookingResponse.json();
    
        setTotalUsers(userData.totalUsers);
        setTotalBookings(bookingData.totalBookings);
      } catch (error) {
        console.error('Error fetching user and booking counts:', error);
      }
    };
  
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/hotels/all');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        await fetchRevenueData();
        await fetchUserAndBookingCounts();
        await fetchHotels();
        await fetchUsers();
        setLoading(false);
      };
      fetchData();
    }, []);
  
    const paginate = (data, page) => {
      const startIndex = (page - 1) * itemsPerPage;
      return data.slice(startIndex, startIndex + itemsPerPage);
    };
  
    const handleNextPage = (setPage, page, data) => {
      if (page < Math.ceil(data.length / itemsPerPage)) {
        setPage(page + 1);
      }
    };
  
    const handlePreviousPage = (setPage, page) => {
      if (page > 1) {
        setPage(page - 1);
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
  return (
    <div>
      <div className="dashboard">
        <div className="card">
          <div className="card-header">
            <span className="title">TỔNG LƯỢT ĐẶT</span>
          </div>
          <div className="card-body">
            <h2>{totalBookings} lượt</h2> 
          </div>
          <div className="card-footer">
            <a href="/DashboardHotel/ListHotelDashboard">Xem chi tiết</a>
            <div className="icon money-icon"><BsCoin/></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="title">TỔNG NGƯỜI DÙNG</span>
          </div>
          <div className="card-body">
            <h2>{totalUsers} người</h2> 
          </div>
          <div className="card-footer">
            <a href="/DashboardHotel/ListHotelDashboard">Xem chi tiết</a>
            <div className="icon orders-icon"><PiCoinBold/></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="title">DOANH THU ĐÃ DUYỆT</span>
          </div>
          <div className="card-body">
            <h2>{approvedRevenue.toLocaleString('vi-VN')} ₫</h2> 
          </div>
          <div className="card-footer">
            <a href="/DashboardHotel/RevenueChartDashboard">Xem chi tiết</a>
            <div className="icon balance-icon"><FaRegUserCircle /></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="title">DOANH THU CHƯA DUYỆT</span>
          </div>
          <div className="card-body">
            <h2>{pendingRevenue.toLocaleString('vi-VN')} ₫</h2> 
          </div>
          <div className="card-footer">
            <a href="/DashboardHotel/RevenueChartDashboard">Xem chi tiết</a>
            <div className="icon customers-icon"><CiWallet /></div>
          </div>
        </div>
      </div>
      <br/><br/>
      <BookingStatistics/>
      <br/><br/>
      <div className="lists-container">
      <div className="list best-selling">
        <div className="list-header">
          <h3>Danh sách khách sạn</h3>
          <br/>
        </div>
        <ul className="list-items">
        {hotels.length > 0 ? (
              paginate(hotels, hotelPage).map(hotel => (
            <li key={hotel._id} className="list-item">
                <div className="item-details">
                <span className="item-name">{hotel.name}</span>
                <span className="item-date">{hotel.createdAt}</span>
                <span className="item-price">{hotel.cheapestPrice}</span> 
                <span className="item-orders">{hotel.rooms.length}</span> 
                <span className="item-stock">{hotel.distance || 'N/A'}</span>
                </div>
            </li>
            ))
        ) : (
            <li>Khách sạn không có giá trị</li>
        )}
        </ul> 
     <div className="pagination">
            <button onClick={() => handlePreviousPage(setHotelPage, hotelPage)}>Sau</button>
            <button onClick={() => handleNextPage(setHotelPage, hotelPage, hotels)}>Trước</button>
          </div>
      </div>

      <div className="list top-sellers">
        <div className="list-header">
          <h3>Danh sách người dùng</h3>
          <br/>
        </div>
        <ul className="list-items">
         {users.length > 0 ? (
              paginate(users, userPage).map(user => (
                <li key={user._id} className="list-item">
                    <div className="item-details">
                    <span className="item-name">{user.username}</span>
                    <span className="item-owner">{user.email}</span>
                    <span className="item-category">{user.country}</span>
                    <span className="item-stock">{user.city || 'N/A'}</span>
                    <span className="item-price">{user.role}</span>
                    </div>
                </li>
                ))
            ) : (
                <li>Người dùng không có giá trị</li>
            )}
            </ul>
            <div className="pagination">
            <button onClick={() => handlePreviousPage(setUserPage, userPage)}>Sau</button>
            <button onClick={() => handleNextPage(setUserPage, userPage, users)}>Trước</button>
          </div>
      </div>
      </div>
            <div className="ct-map-container">
            <br/>
            <br/>
              <div className="title_ct-map-container">
                <h2>VIETNAMESE</h2>
              </div>
                <div className="ct-map-frame">
                    <iframe
                        title="Vietnam Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12149211.914973624!2d102.10945815874893!3d14.05832456459109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fbffcc60b9d%3A0x373319107d27f0d0!2zVmlldG5hbQ!5e0!3m2!1svi!2s!4v1638409512725!5m2!1svi!2s"
                        width="100%"
                        height="400"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
    </div>
    
    </div>
  );
};

export default DashboardHome2;
