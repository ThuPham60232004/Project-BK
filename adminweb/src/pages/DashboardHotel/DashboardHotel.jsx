import React from 'react';
import './DashboardHotel.css';
import NavBarDashboardHotel from '../../components/DashboardHotelComponent/navBarDashboardHotel/navBarDashboardHotel';
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

const DashboardHotel = () => {
    const items = [
        { icon: <RiDashboardLine style={{ width: '25px', height: '25px' }} />, text: "Mục chính", path: "/DashboardHotel" },
        { icon: <FaRegUserCircle style={{ width: '25px', height: '25px' }} />, text: "Danh sách người dùng", path: "/DashboardHotel/ListUserDashboard" },
        { icon: <LiaHotelSolid style={{ width: '25px', height: '25px' }} />, text: "Danh sách khách sạn/Phòng", path: "/DashboardHotel/ListHotelDashboard" },
        { icon: <RiDiscountPercentLine style={{ width: '25px', height: '25px' }} />, text: "Danh sách mã giảm giá", path: "/DashboardHotel/ListDiscountCodeDashboard" },
        { icon: <IoMdNotificationsOutline style={{ width: '25px', height: '25px' }} />, text: "Danh sách thông báo", path: "/DashboardHotel/ListNotificationDashboard" },
        { icon: <GoCodeReview style={{ width: '25px', height: '25px' }} />, text: "Danh sách đánh giá", path: "/DashboardHotel/ListReviewDashboard" },
        { icon: <GoCodeReview style={{ width: '25px', height: '25px' }} />, text: "Danh sách đặt phòng", path: "/DashboardHotel/ListBookingDashboard" },
        { icon: <TbReportAnalytics style={{ width: '25px', height: '25px' }} />, text: "Báo cáo thống kê doanh thu", path: "/DashboardHotel/RevenueChartDashboard" },
        { icon: <RiDashboardLine style={{ width: '25px', height: '25px' }} />, text: "Thông tin cá nhân", path: "/DashboardHotel/UserProfile" }
    ];

    return (
        
        <div className='DashboardHotel'>
            <NavBarDashboardHotel />
            <div className='DashboardHotelContainer'>
                <div className='DashboardHotelSideBar'>
                    {items.map((item, index) => (
                        <NavLink to={item.path} key={index}  style={{ textDecoration: "none", color:"black" }}
                        className={({ isActive }) => isActive ? "active" : ""} >
                            <div className='DashboardHotelSideBarItem'>
                                <div className='DashboardHotelSideBarItemIcon'>
                                    {item.icon}
                                </div>
                                <div className='DashboardHotelSideBarItemText'>{item.text}</div>
                            </div>
                        </NavLink>
                   
                    ))}
                </div>
                <div className='DashboardHotelComponent'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardHotel;
