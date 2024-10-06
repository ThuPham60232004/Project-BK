import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import './login.css';

const Login = () => {
  const [credential,setCredential]=useState({
    username:"",
    password:"",
  });
 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword]   
 = useState('');
  const [error, setError] = useState(null);   

  const fakeLoginData = {
    username: 'abc',
    password: '123',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username !== fakeLoginData.username || password !== fakeLoginData.password) {
      console.log('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.');
      return;
    }

    setError(null);
    console.log('Đăng nhập thành công!');
    navigate('/Dashboard'); 
  };

  const registerLink = () => {
    navigate('/register');
  };

  return (
    <div className="login_page">
      <div className="login_container">
        <div className="left_container_login" onSubmit={handleSubmit}>
          <div className="logo_login_con">
              <img src="./nft-image-1.png" alt="" className='logo_login'/>
             <h2 className='title_login'>ĐĂNG NHẬP</h2>
          </div>
          <div className="body_login_container_left">
            <div className="form_field" >
              <div className="input_group_login">
                <input type="text" className="input_info_login"  
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
                <label className="name_label" htmlFor="email">Email</label>
              </div>
              <div className="input_group_login">
                <input type="password" className="input_info_login" 
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
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

              <button className='loginbtn'>Đăng nhập</button>
          
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
