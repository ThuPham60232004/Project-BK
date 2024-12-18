import React,{ useEffect } from 'react';
import './HomePage.css';
import NavBar from '../../components/navBar/navBar';
import { RiDashboardLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { FaRegListAlt } from "react-icons/fa"; 
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoCodeReview } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { LuListTodo } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa"; 
import { MdRoomService } from "react-icons/md"; 
import { MdPersonPin } from "react-icons/md"; 
import { NavLink, Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { SiAuthelia } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '') {
            navigate('/DashboardHome1'); 
        }   
    }, [location.pathname, navigate]);

    const items = [       
        { icon: <RiDashboardLine style={{ width: '25px', height: '25px' }} />, text: "Mục chính", path: "/DashboardHome1" },
        { icon: <FaRegUserCircle style={{ width: '25px', height: '25px' }} />, text: "Danh sách người dùng", path: "/ListUser" },
        { icon: <LiaHotelSolid style={{ width: '25px', height: '25px' }} />, text: "Danh sách khách sạn", path: "/ListHotel" },
        { icon: <FaRegListAlt style={{ width: '25px', height: '25px' }} />, text: "Danh sách phòng", path: "/ListRoom" },
        { icon: <MdRoomService style={{ width: '25px', height: '25px' }} />, text: "Danh sách đơn đặt phòng", path: "/ListBooking" },
        { icon: <RiDiscountPercentLine style={{ width: '25px', height: '25px' }} />, text: "Danh sách mã giảm giá", path: "/ListDiscountCode" },
        { icon: <IoMdNotificationsOutline style={{ width: '25px', height: '25px' }} />, text: "Danh sách thông báo", path: "/ListNotification" },
        { icon: <GoCodeReview style={{ width: '25px', height: '25px' }} />, text: "Danh sách đánh giá", path: "/ListReview" },
        { icon: <TbReportAnalytics style={{ width: '25px', height: '25px' }} />, text: "Báo cáo thống kê doanh thu", path: "/RevenueChart" },
        { icon: <FaChartLine style={{ width: '25px', height: '25px' }} />, text: "Báo cáo thống kê hoạt động", path: "/UserActivityStats" },
        { icon: <LuListTodo style={{ width: '25px', height: '25px' }} />, text: "Quản lý trạng thái đơn đặt phòng", path: "/StatusBooking" },
        { icon: <LuListTodo style={{ width: '25px', height: '25px' }} />, text: "Quản lý trạng thái phòng", path: "/StatusRoom" },
        { icon: <MdPersonPin style={{ width: '25px', height: '25px' }} />, text: "Phân quyền", path: "/Decentralization" },
        { icon: <SiAuthelia style={{ width: '25px', height: '25px' }} />, text: "Cấp tài khoản", path: "/AccountLevel" },
        { icon: <RiAdminFill style={{ width: '25px', height: '25px' }} />, text: "Thông tin cá nhân", path: "/UserProfile" }
    ];

    return (
        <div className='HomePage'>
            <NavBar />
            <div className='HomePageContainer'>
                <div className='HomePageSideBar'>
                    {items.map((item, index) => (
                        <NavLink to={item.path} key={index} style={{ textDecoration: "none", color: "black" }}
                            className={({ isActive }) => isActive ? "active" : ""}>
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
