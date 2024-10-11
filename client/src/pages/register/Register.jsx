import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
  });

  // Lấy thông tin loading và error từ AuthContext
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Hàm xử lý khi nhấn nút đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });

    try {
      const res = await axios.post("http://localhost:9000/api/auth/register", formData);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });

      toast.error(err.response.data.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="register-hongpiknuahihi">
      <div className="register-container">
      <ToastContainer />
      <div className="register-form">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="register_haa">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          </div>
          <button type="submit" disabled={loading}>
            Đăng ký
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;