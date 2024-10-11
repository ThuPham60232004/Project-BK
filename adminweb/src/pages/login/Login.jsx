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
          <div className="logo_login_con">
              <img src="./nft-image-1.png" alt="" className='logo_login'/>
             <h2 className='title_login'>ĐĂNG NHẬP</h2>
          </div>
          <div className="body_login_container_left">
            <div className="form_field" >
              <div className="input_group_login">
                <input type="text" className="input_info_login"  
                id='username'
                placeholder="Tài khoản"
                onChange={handleChange}/>
                <label className="name_label" htmlFor="email">Email</label>
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
          
            <div className="social_login">
              <p>Hoặc sử dụng tài khoản mạng xã hội</p>
              <div className="social_icons_login">
                <a href="#"><FaFacebookF className='icon_social_login'/></a>
                <a href="#"><FaGoogle className='icon_social_login'/></a>
              </div>
            </div>
            <div className="text_register">
              <p>Chưa có tài khoản? <span><a href="#" onClick={registerLink}>Đăng ký tại đây</a></span></p>
            </div>
          </div>
        </div>
         {error && <p className="error-message">{error}</p>}
        <div className="right_container_login">
        
        <h1>Chào mừng đến với FINTECH</h1>
        <p>Nếu bạn chưa có tài khoản, hãy tham gia cùng chúng tôi và khám phá thế giới số mới.</p>
        <div className="btn_register">
              <button onClick={registerLink}>Đăng ký<FaArrowRightLong className='icon_arrow_register'/></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
