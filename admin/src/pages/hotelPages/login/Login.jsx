import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.details.role === "hotel_admin"&&res.data.isAdmin) {
        localStorage.setItem("userId", res.data.details._id);
        localStorage.setItem("role", res.data.details.role);
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Bạn không có quyền truy cập" },
        });
        console.log("Đăng nhập vào admin-hotel");
      }
      else if (res.data.isAdmin) {
        localStorage.setItem("userId", res.data.details._id);
        localStorage.setItem("role", res.data.details.role);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        console.log("Đăng nhập vào admin");
        navigate("/");
      }
       else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Bạn không được quyền đăng nhập vào trang này" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="navbar11">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">BOOKING</span>
          </Link>
          {!user && (
            <div className="navItems">
              <Link to="/hotel-admin/register" style={{ textDecoration: "none" }}>
                <button className="navButton">Đăng ký</button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button className="navButton">Đăng nhập</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="lContainer">
        <h1>Đăng Nhập</h1>
        <input
          type="text"
          placeholder="Tài khoản"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Đăng Nhập
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
