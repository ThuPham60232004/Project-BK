import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EditModal from "../../components/EditModal/EditModal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Single = ({ type }) => {
  const { userId, hotelId, roomId, bookingId } = useParams();
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fieldLabels = {
    username: "Tên người dùng",
    email: "Email",
    country: "Quốc gia",
    img: "Hình ảnh",
    city: "Thành phố",
    phone: "Số điện thoại",
    password: "Mật khẩu",
    CCCD: "CCCD",
    isAdmin: "Quản trị viên",
    role: "Vai trò",
    passwordResetToken: "Mã đặt lại mật khẩu",
    passwordResetExpires: "Thời gian hết hạn mã đặt lại mật khẩu",
    user: "Người dùng",
    hotel: "Khách sạn",
    room: "Phòng",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    paymentMethod: "Phương thức thanh toán",
    status: "Trạng thái",
    totalPrice: "Tổng giá",
    checkintime: "Thời gian nhận phòng",
    idAdmin: "ID quản trị viên",
    createdAt: "Ngày tạo",
    updatedAt: "Ngày cập nhật",
  };

  useEffect(() => {
    let id = "";
    switch (type) {
      case "user":
        id = userId;
        setTitle("Thông Tin Người Dùng");
        setUrl(`/users/${id}`);
        break;
      case "hotel":
        id = hotelId;
        setTitle("Thông Tin Khách Sạn");
        setUrl(`/hotels/${id}`);
        break;
      case "room":
        id = roomId;
        setTitle("Thông Tin Phòng");
        setUrl(`/rooms/${id}`);
        break;
      case "booking":
        id = bookingId;
        setTitle("Thông Tin Đặt Phòng");
        setUrl(`/bookings/${id}`);
        break;
      default:
        break;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        toast.error("Không thể tải dữ liệu.");
      }
    };

    if (url) {
      fetchData();
    }
  }, [type, userId, hotelId, roomId, bookingId, url]);

  const handleEditButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = (updatedData) => {
    setData(updatedData);
    toast.success("Chỉnh sửa thành công!");
  };

  const handleSaveError = (error) => {
    toast.error(`Chỉnh sửa thất bại: ${error.message}`);
  };

  const renderDetailItem = (key, value) => {
    const label = fieldLabels[key] || key;
    return (
      <div className="detailItem" key={key}>
        <span className="itemKey">{label}:</span>
        <span className="itemValue">
          {typeof value === 'object' ? JSON.stringify(value) : value}
        </span>
      </div>
    );
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleEditButtonClick}>Chỉnh Sửa</div>
            <h1 className="title">{title}</h1>
            {data ? (
              <div className="item">
                <img
                  src={data.img || "https://via.placeholder.com/150"}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{data.name || data.title}</h1>
                  {Object.keys(data).map((key) => renderDetailItem(key, data[key]))}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
      {showModal && (
        <EditModal
          data={data}
          url={url}
          onClose={handleCloseModal}
          onSave={handleSave}
          onError={handleSaveError}
        />
      )}
    </div>
  );
};

export default Single;
