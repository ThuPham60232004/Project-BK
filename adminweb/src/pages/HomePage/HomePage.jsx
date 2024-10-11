import React from 'react';
import './HomePage.css';
import NavBar from '../../components/navBar/navBar';
import { RiDashboardLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { FaChartLine } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoCodeReview } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { LuListTodo } from "react-icons/lu";
import { NavLink, Outlet } from 'react-router-dom';

const HomePage = () => {
    const items = [
        { icon: <RiDashboardLine style={{ width: '25px', height: '25px' }} />, text: "Mục chính", path: "/" },
        { icon: <FaRegUserCircle style={{ width: '25px', height: '25px' }} />, text: "Danh sách người dùng", path: "/ListUser" },
        { icon: <LiaHotelSolid style={{ width: '25px', height: '25px' }} />, text: "Danh sách khách sạn/Phòng", path: "/ListHotel" },
        { icon: <RiDiscountPercentLine style={{ width: '25px', height: '25px' }} />, text: "Danh sách mã giảm giá", path: "/ListDiscountCode" },
        { icon: <IoMdNotificationsOutline style={{ width: '25px', height: '25px' }} />, text: "Danh sách thông báo", path: "/ListNotification" },
        { icon: <GoCodeReview style={{ width: '25px', height: '25px' }} />, text: "Danh sách đánh giá", path: "/ListReview" },
        { icon: <GoCodeReview style={{ width: '25px', height: '25px' }} />, text: "Danh sách đơn đặt phòng", path: "/ListBooking" },
        { icon: <TbReportAnalytics style={{ width: '25px', height: '25px' }} />, text: "Báo cáo thống kê doanh thu", path: "/RevenueChart" },
        { icon: <FaChartLine style={{ width: '25px', height: '25px' }} />, text: "Báo cáo thống kê hoạt động", path: "/UserActivityStats" },
        { icon: <LuListTodo style={{ width: '25px', height: '25px' }} />, text: "Danh sách công việc", path: "/" },
        { icon: <LuListTodo style={{ width: '25px', height: '25px' }} />, text: "Quản lý trang thái đơn đặt phòng", path: "/" },
        { icon: <LuListTodo style={{ width: '25px', height: '25px' }} />, text: "Quản lý trang thái phòng", path: "/" },
        { icon: <RiDashboardLine style={{ width: '25px', height: '25px' }} />, text: "Thông tin cá nhân", path: "/UserProfile" }
    ];

    return (
        
        <div className='HomePage'>
            <NavBar />
            <div className='HomePageContainer'>
                <div className='HomePageSideBar'>
                    {items.map((item, index) => (
                        <NavLink to={item.path} key={index}  style={{ textDecoration: "none", color:"black" }}
                        className={({ isActive }) => isActive ? "active" : ""} >
                            <div className='HomePageSideBarItem'>
                                <div className='HomePageSideBarItemIcon'>
                                    {item.icon}
                                </div>
                                <div className='HomePageSideBarItemText'>{item.text}</div>
                            </div>
                        </NavLink>
                   
                    ))}
                </div>
                <div className='HomePageComponent'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
