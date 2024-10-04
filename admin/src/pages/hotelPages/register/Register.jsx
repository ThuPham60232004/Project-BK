// Import các thư viện và file cần thiết
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Navbar1 from "../../../components/hotelcomponents/navbar/Navbar";
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

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });

    try {
      const res = await axios.post("/auth/registerAdmin", formData);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });

      toast.success("Đăng ký thành công!");

      navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });

      toast.error(err.response.data.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="to">
      <Navbar1 />
      <ToastContainer />
      <div className="register">
        <h2>Đăng Ký</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading}>
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
