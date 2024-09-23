import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/api/auth/sendVerificationCode", { email });
      toast.success("Email đã được gửi, vui lòng kiểm tra hộp thư.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Có lỗi xảy ra.");
    }
  };

  return (
    <div className="forgotPassword">
      <div className="navbar">
       
      </div>
      <div className="fpContainer">
        <h1>Quên Mật Khẩu</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          className="fpInput"
        />
        <button onClick={handleClick} className="fpButton">
          Gửi mã xác minh
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
