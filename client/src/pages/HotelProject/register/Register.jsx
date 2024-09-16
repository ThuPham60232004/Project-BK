// Import necessary libraries and files
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";

// Define Register component
const Register = () => {
  // Manage form data state
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    lastName: "",
    middleAndFirstName: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch({ type: "REGISTER_START" });

    try {
      const res = await axios.post("/auth/register", formData);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      toast.success("Registration successful!");

      // Navigate to login after registration
      navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
      toast.error(err.response.data.message || "Registration failed!");
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
            id="emailOrPhone"
            placeholder="Email/Số điện thoại"
            value={formData.emailOrPhone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="lastName"
            placeholder="Họ"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="middleAndFirstName"
            placeholder="Tên đệm và tên"
            value={formData.middleAndFirstName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
type="text"
            id="referralCode"
            placeholder="Mã giới thiệu (nếu có)"
            value={formData.referralCode}
            onChange={handleChange}
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