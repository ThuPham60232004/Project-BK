import axios from "axios";
import { useState,useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/auth/forgotPassword/', { email });
      toast.success(response.data.message);
      navigate(`/reset-password?email=${encodeURIComponent(email)}`); 
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
      }
    }
  };

  return (
    <div className="forgotPassword">
      <div className="fpContainer">
        <h1>Quên Mật Khẩu</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="fpInput"
        />
        <button onClick={handleForgotPassword} className="fpButton">
          Gửi mã xác minh
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
