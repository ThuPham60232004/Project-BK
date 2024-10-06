import React, { useState } from 'react';
import { FaUserAlt, FaLock, FaPhoneAlt } from 'react-icons/fa';
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebookF,FaGoogle } from "react-icons/fa";
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleAndFirstName, setMiddleAndFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailOrPhone.length !== 10 || isNaN(emailOrPhone)) {
      console.log('Số điện thoại phải đủ 10 ký tự và là số.');
  
      return;
    }

    if (password !== confirmPassword) {
       console.log('Mật khẩu và xác nhận mật khẩu không trùng khớp.');
   
      return;
    }
 
    try {
   
      setError(null);
      console.log('Registration successful!');
      navigate('/login'); 
    } catch (error) {
      setError(error.message);
      console.log('Registration failed. Please check your input.');
    }
  };

  const loginLink = () => {
    navigate('/login');
  };

  return (
   <div className="register_page">
      <div className="register_container">
        <div className="left_container_register" onSubmit={handleSubmit}>
          <div className="logo_register_con">
              <img src="./nft-image-1.png" alt="" className='logo_register'/>
             <h2 className='title_register'>Đăng ký</h2>
          </div>
          <div className="body_register_container_left">
            <div className="form_field" >
              <div className="input_group_register">
                <input type="text" className="input_info_register"  required />
                <label className="name_label" htmlFor="email">Email</label>
              </div>
              <div className="input_group_register">
                <input type="text" className="input_info_register"required />
                <label className="name_label">Họ</label>
              </div>
              <div className="input_group_register">
                <input type="text" className="input_info_register"required />
                <label className="name_label">Tên</label>
              </div>
              <div className="input_group_register">
                <input type="password" className="input_info_register"required />
                <label className="name_label">Mật khẩu</label>
              </div>
              <div className="input_group_register">
                <input type="Password" className="input_info_register"required />
                <label className="name_label">Xác nhận mật khẩu</label>
              </div>
            </div>
         
              <button className='registerbtn'>Đăng ký</button>
          
            <div className="social_register">
              
              <p>Hoặc sử dụng tài khoản của bạn</p>
              <div className="social_icons_register">
                <a href="#"><FaFacebookF className='icon_social_register'/></a>
                <a href="#"><FaGoogle className='icon_social_register'/></a>
              </div>
            </div>
            <div className="text_register">
              <p>Bạn có tài khoản chưa? <span><a href="#">Đăng nhập ở đây</a></span></p>
            </div>
          </div>
        </div>
         {error && <p className="error-message">{error}</p>}
        <div className="right_container_register">
        
        <h1>Chào mừng đến với BOOKING</h1>
        <p>Hãy đăng ký và trải nghiệm với chúng tui.</p>
        <div className="btn_register">
              <button onClick={loginLink}>Đăng nhập<FaArrowRightLong className='icon_arrow_register'/></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

