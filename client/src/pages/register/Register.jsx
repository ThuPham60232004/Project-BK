import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length !== 10 || isNaN(phone)) {
      toast.error('Số điện thoại phải đủ 10 ký tự và là số.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu và xác nhận mật khẩu không trùng khớp.');
      return;
    }

    try {
      setError(null);
      const response = await axios.post("http://localhost:9000/api/auth/register", {
        username,
        email,
        phone,
        password,
      });
      toast.success('Đăng ký thành công!');
      navigate('/login');
  } catch (error) {
    console.error(error);
    toast.error('Đăng ký thất bại. Vui lòng kiểm tra lại.');
  }
  };

  const loginLink = () => {
    navigate('/login');
  };

  return (
    <div className="register_page">
      <div className="register_container">
        <div className="right_container_register">
          <div className="content_right_container_register">
            <h1>Chào mừng đến với BOOKING</h1>
            <p>Nếu bạn đã có tài khoản, hãy đăng nhập để khám phá thêm nhiều tính năng.</p>
            <button className="btn_login_page_register" onClick={loginLink}>Đăng nhập</button>
          </div>
        </div>

        <div className="left_container_register">
          <div className="content_left_container_register">
            <div className="logo_register_con">
              <img src="./img/collection.png" alt="" />
              <h2 className="title_register">Đăng ký</h2>
            </div>

            <div className="body_register_container_left">
              <form onSubmit={handleSubmit} className="form_field">
                <div className="input_group_register">
                  <input
                    type="text"
                    className="input_info_register"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label className="name_label">Tên đăng nhập</label>
                </div>

                <div className="input_group_register">
                  <input
                    type="email"
                    className="input_info_register"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className="name_label">Email</label>
                </div>

                <div className="input_group_register">
                  <input
                    type="text"
                    className="input_info_register"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <label className="name_label">Số điện thoại</label>
                </div>

                <div className="input_group_register">
                  <input
                    type="password"
                    className="input_info_register"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="name_label">Mật khẩu</label>
                </div>

                <div className="input_group_register">
                  <input
                    type="password"
                    className="input_info_register"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label className="name_label">Xác nhận mật khẩu</label>
                </div>

                <button className="btn_register_re" type="submit">Đăng ký</button>
              </form>

              <p className="text_register">Đã có tài khoản? <span><a href="/login">Đăng nhập ngay</a></span></p>
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
