import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";
import { FaArrowRightLong } from "react-icons/fa6";
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
    <div className="login_page">
      <div className="login_container">
        <div className="left_container_login">
          <br/><br/><br/>
          <div className="logo_login_con">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgT1iiYeCfstXM8A0kYUIzQuLEhWnqxy7mVQ&s" alt="" className='logo_login'/>
             <h2 className='title_login'>ĐĂNG NHẬP</h2>
          </div>
          <div className="body_login_container_left">
            <div className="form_field" >
              <div className="input_group_login">
                <input type="text" className="input_info_login"  
                id='username'
                placeholder="Tài khoản"
                onChange={handleChange}/>
                <label className="name_label" htmlFor="username">Tên tài khoản</label>
              </div>
              <div className="input_group_login">
                <input type="password" className="input_info_login" 
                  placeholder="Mật khẩu"
                  id="password"
                  onChange={handleChange}/>
                <label className="name_label" htmlFor="password">Mật khẩu</label>
              </div>
            </div>
           <div className="action_login">
            <div className="checkbox_group_login">
              <input type="checkbox"/>
              <label className='rememberme' htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
            </div>
            <a href="/forgotpassword">Quên mật khẩu?</a>
          </div>

            <button disabled={loading} onClick={handleClick} className='loginbtn'>Đăng nhập</button>
          </div>
        </div>
         {error && <p className="error-message">{error}</p>}
        <div className="right_container_login">
        
        <h1>Chào mừng đến với BOOKING</h1>
        <p>Nếu bạn chưa có tài khoản, hãy tham gia cùng chúng tôi và khám phá thế giới khách sạn mới.</p>
        <div className="btn_register">
            <a href='/register'>
            <button>ĐĂNG KÍ<FaArrowRightLong className='icon_arrow_register'/></button>
            </a>
             
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;