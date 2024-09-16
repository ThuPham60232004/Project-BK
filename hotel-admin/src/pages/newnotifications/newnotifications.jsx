import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./newNotification.css";

const NewNotification = ({ title }) => {
  const [info, setInfo] = useState({});
  const [userId, setUserId] = useState("");
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/admins"); 
        setAdmins(response.data);
      } catch (err) {
        console.log(err);
        toast.error("Không thể tải danh sách quản trị viên.");
      }
    };

    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/notifications", {
        ...info,
        message,
        user: userId,
      });
      toast.success("Thông báo đã được tạo thành công!");
    } catch (err) {
      console.log(err);
      toast.error("Không thể tạo thông báo. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="newNotification">
      <Sidebar />
      <div className="newNotificationContainer">
        <Navbar />
        <div className="top">
          <h2>Thêm mới thông báo</h2>
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="message">Thông báo</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập nội dung thông báo"
                />
              </div>
              <div className="formInput">
                <label>Chọn Người Dùng</label>
                <select id="userId" onChange={(e) => setUserId(e.target.value)}>
                  <option value="">Chọn người dùng</option>
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Chọn Quản Trị Viên (Tùy chọn)</label>
                <select id="idAdmin" onChange={handleChange}>
                  <option value="">Chọn quản trị viên (tùy chọn)</option>
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Gửi</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewNotification;
