import "./navbarAirplane";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";      
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbarproject">
        <div className="navContainerproject">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">BOOKING</span>
          </Link>

          {user ? (
            <div className="navItems">
              <div className="userInfo">
                {user.img && <img src={user.img} alt="User" className="userImg" />}
                <span className="username">{user.username}</span>
              </div>
              <button className="navButton" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : null}
        </div>
        {user ? null : (
          <div className="navItems">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <button className="navButton">Đăng ký</button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="navButton">Đăng nhập</button>
            </Link>
          </div>
        )}
      </div>
      <div className="navbarBottom">
        <ul className="headernavbar">
          <li onClick={toggleMenu} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faBars} />
          </li>
            <li><Link to="/" className="navbarLink">Trang Chủ</Link></li>
            <li><Link to="/homeairplane" className="navbarLink">Đặt vé máy bay</Link></li>
            <li><Link to="/notifications" className="navbarLink">Thông báo</Link></li>
            <li><Link to="/aboutus" className="navbarLink">Giới thiệu</Link></li>
            <li><Link to="/profile" className="navbarLink">Thông tin cá nhân</Link></li>
        </ul>
        {isMenuOpen && (
          <div className="dropdownMenu">
            <h4>Menu</h4>
            <ul>
              <li><Link to="/" className="navbar11">Đánh giá</Link></li>
              <li><Link to="/DiscountCodeAirplanes" className="navbar11">Săn mã giảm giá</Link></li>
              <li><Link to="/FlightTickets" className="navbar11">Danh sách máy bay</Link></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
