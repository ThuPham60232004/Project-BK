import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../../components/hotelcomponents/sidebar/Sidebar";
import Navbar from "../../../components/hotelcomponents/navbar/Navbar";
import "./newbooking.css";

const Newbooking = ({ inputs, title }) => {
  const [info, setInfo] = useState({
    user: "",
    hotel: "",
    room: "",
    startDate: "",
    endDate: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/bookings", info);
      toast.success("Đặt chỗ được tạo thành công!");
    } catch (err) {
      console.log(err);
      toast.error("Không tạo được lượt đặt chỗ.");
    }
  };

  return (
    <div className="newBooking">
      <Sidebar />
      <div className="newBookingContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    value={input.value}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Tạo phòng</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Newbooking;
