import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetPassword.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/api/auth/verifyResetCode/', {
        email, 
        resetCode,
        newPassword
      });
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
      }
    }
  };

  return (
    <div className="resetPassword">
      <div className="rpContainer">
        <h1>Đặt Lại Mật Khẩu</h1>
        <input
          type="text"
          placeholder="Mã xác thực"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          className="rpInput"
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="rpInput"
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rpInput"
        />
        <button onClick={handleResetPassword} className="rpButton">
          Đặt lại mật khẩu
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
