import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSearch = (query) => {
    const [type, ...rest] = query.split(":");
    const searchParams = rest.join(":");

    switch (type) {
      case 'hotel':
        navigate(`/hotels/search?name=${searchParams}`);  // Search hotels by name
        break;
      case 'room':
        navigate(`/rooms/search?query=${searchParams}`);  // Search rooms by info
        break;
      case 'review':
        navigate(`/reviews/search?query=${searchParams}`);  // Search reviews by info
        break;
      case 'notification':
        navigate(`/notifications/search?user=${searchParams}`);  // Search notifications by user ID
        break;
      case 'booking':
        navigate(`/bookings/search?${searchParams}`);  // Search bookings by criteria
        break;
      case 'discount':
        navigate(`/discounts/search?${searchParams}`);  // Search discounts by criteria
        break;
      default:
        alert("Loại tìm kiếm không hợp lệ");
        break;
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      if (timer) {
        clearTimeout(timer);  // Clear previous timer if user keeps typing
      }
      setTimer(
        setTimeout(() => {
          handleSearch(searchQuery);
        }, 5000)  // Delay of 5 seconds
      );
    }
  }, [searchQuery]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Tìm kiếm khách sạn, phòng, đánh giá, thông báo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchOutlinedIcon />
        </div>
        <div className="navItems">
          {user ? (
            <div className="userInfo">
              {user.img && <img src={user.img} alt="User" className="userImg" />}
              <span className="username">{user.username}</span>
              <button onClick={handleLogout} className="logoutButton">
                Đăng Xuất
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="loginButton">
              Đăng Nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
