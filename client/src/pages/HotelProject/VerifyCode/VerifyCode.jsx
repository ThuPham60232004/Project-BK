import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "verificationCode") setVerificationCode(value);
    if (id === "newPassword") setNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/resetpassword", {
        email,
        verificationCode,
        newPassword,
      });
      setMessage("Mật khẩu đã được đặt lại thành công.");
      setError("");
      navigate("/login");
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Có lỗi xảy ra khi đặt lại mật khẩu.");
    }
  };

  return (
    <div>
      <h2>Xác minh mã và đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mã xác minh:
          <input type="text" id="verificationCode" value={verificationCode} onChange={handleChange} required />
        </label>
        <label>
          Mật khẩu mới:
          <input type="password" id="newPassword" value={newPassword} onChange={handleChange} required />
        </label>
        <button type="submit">Đặt lại mật khẩu</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyCode;
