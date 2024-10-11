import "./navbar.css";
import { useContext} from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="logo"></div>
        <div className="userInfo">
          {user.img && <img src={user.img} alt="User" className="NavBarUserImage" />}
          <span className="username">{user.username}</span>
          <button onClick={handleLogout} className="logoutButton">
            Đăng Xuất
          </button>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
