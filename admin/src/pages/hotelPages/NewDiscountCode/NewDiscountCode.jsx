import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../../components/hotelcomponents/sidebar/Sidebar";
import Navbar from "../../../components/hotelcomponents/navbar/Navbar";
import "./newdiscountcode.css"; 

const NewDiscountCode = ({ inputs, title }) => {
  const [info, setInfo] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    startDate: "",
    expirationDate: "",
    amountDiscountCode: "",
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/discounts", info);
      toast.success("Mã giảm giá đã được tạo thành công!");
    } catch (err) {
      console.log(err);
      toast.error("Không tạo được mã giảm giá.");
    }
  };

  return (
    <div className="newDiscountCode">
      <Sidebar />
      <div className="newDiscountCodeContainer">
        <Navbar />
        <div className="top">
          <h2>Thêm mã giảm giá</h2>
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
              <button onClick={handleClick}>Tạo mã giảm giá</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewDiscountCode;
