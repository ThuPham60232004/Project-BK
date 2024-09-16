import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);

      console.log("Dữ liệu phản hồi:", res.data);

      const { details, token } = res.data;

      if (!token) {
        throw new Error("Token không tồn tại");
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: { user: details, token } });

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", details._id);

      toast.success("Đăng nhập thành công!");

      navigate("/");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response?.data || err.message);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || { message: err.message } });

      toast.error(err.response?.data?.message || err.message || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="login">
      {/* Text Section */}
      <div className="loginText">
        <h1>Kết nối giá trị - Trải nghiệm tinh hoa </h1>
        <span>
          Đặc quyền ưu việt dành riêng cho thành viên khi trải nghiệm sản phẩm và<br />
          dịch vụ trong hệ sinh thái toàn diện 
        </span>
      </div>

      {/* Login Form Section */}
      <div className="lContainer">
        <h1>Đăng Nhập</h1>
        <input
          type="text"
          placeholder="Người dùng"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput"
        />
        <div className="forget">
          <label>
            <input type="checkbox" />Nhớ mật khẩu
          </label>
        </div>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Đăng Nhập
        </button>
        {error && <span>{error.message}</span>}
        <div className="forgetPassword">
          <Link to="/forgotpassword" className="forgotPasswordLink">Quên mật khẩu?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;