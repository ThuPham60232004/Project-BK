import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import './login.css';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
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
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        console.log("Đăng nhập vào admin-hotel");
        navigate("/DashboardHotel");
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
  const registerLink = () => {
    navigate('/register');
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
           
                onChange={handleChange}/>
                <label className="name_label" htmlFor="username">Tên tài khoản</label>
              </div>
              <div className="input_group_login">
                <input type="password" className="input_info_login" 
               
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
              <button>XIN CHÀO<FaArrowRightLong className='icon_arrow_register'/></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
