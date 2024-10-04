import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Chart from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HotelIcon from "@mui/icons-material/Hotel";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate import
import { DarkModeContext } from "../../../context/darkModeContext";
import { AuthContext } from "../../../context/AuthContext"; // Import AuthContext
import { useContext } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { TbBrowserCheck } from "react-icons/tb";
import { TbBrowserPlus } from "react-icons/tb";
const Sidebar = () => {
  const { dispatch: darkModeDispatch } = useContext(DarkModeContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="top">
      <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Trang quản lý</span>
          </Link> 
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Danh sách</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Người Dùng</span>
            </li>
          </Link>
          <Link to="/select-hotel" style={{ textDecoration: "none" }}>
            <li>
              <HotelIcon className="icon" />
              <span>Khách sạn-Phòng</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Khách Sạn</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Phòng</span>
            </li>
          </Link>
          <Link to="/browseAdminHotel" style={{ textDecoration: "none" }}>
            <li>
              <TbBrowserPlus className="icon" />
              <span>Duyệt admin khách sạn</span>
            </li>
          </Link>
          <Link to="/browseTheRooms" style={{ textDecoration: "none" }}>
            <li>
              <TbBrowserCheck  className="icon" />
              <span>Duyệt các đơn đặt phòng</span>
            </li>
          </Link>
          <Link to="/bookings" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Đơn đặt phòng</span>
            </li>
          </Link>
          <p className="title">Hữu ích</p>
          <Link to="/statistics" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>Số liệu thống kê</span>
            </li>
          </Link>
          <Link to="/statistics1" style={{ textDecoration: "none" }}>
            <li>
              <Chart className="icon" />
              <span>Số liệu thống kê chi tiết</span>
            </li>
          </Link>
          <Link to="/notifications" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Thông báo</span>
            </li>
          </Link>
          <p className="title">Dịch vụ</p>
          <Link to="/reviews" style={{ textDecoration: "none" }}>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>Đánh giá</span>
            </li>
          </Link>
          <Link to="/discounts" style={{ textDecoration: "none" }}>
            <li>
              <LocalOfferIcon className="icon" />
              <span>Mã giảm giá</span>
            </li>
          </Link>

          
          <p className="title">Người Dùng</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Hồ sơ</span>
            </li>
          </Link>
         
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Đăng Xuất</span>
          </li>

        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => darkModeDispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => darkModeDispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
