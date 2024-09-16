import "./single.css";
import Sidebar from "../../../components/hotelcomponents/sidebar/Sidebar";
import Navbar from "../../../components/hotelcomponents/navbar/Navbar";
import EditModal from "../../../components/hotelcomponents/EditModal/EditModal";  
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleBooking = ({ type }) => {
  const { userId, hotelId, roomId, bookingId } = useParams();
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Set the URL and title based on the type prop
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
  }, [type, userId, hotelId, roomId, bookingId]);

  // Fetch data based on the URL
  useEffect(() => {
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
  }, [url]);

  // Handlers for modal visibility
  const handleEditButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handlers for saving data
  const handleSave = (updatedData) => {
    setData(updatedData);
    toast.success("Chỉnh sửa thành công!");
  };

  const handleSaveError = (error) => {
    toast.error(`Chỉnh sửa thất bại: ${error.message}`);
  };

  // Define labels for fields specific to each type
  const fieldLabels = {
    user: {
      username: "Tên Người Dùng",
      email: "Email",
      id: "ID Người Dùng",
    },
    hotel: {
      id: "ID Khách Sạn",
      name: "Tên Khách Sạn",
      address: "Địa Chỉ",
    },
    booking: {
      user: "Người dùng",
      hotel: "Khách sạn",
      room: "Phòng",
      startDate: "Ngày Bắt Đầu",
      endDate: "Ngày Kết Thúc",
      paymentMethod: "Phương Thức Thanh Toán",
      status: "Trạng Thái",
      totalPrice: "Tổng Giá",
      checkintime: "Thời Gian Nhận Phòng",
      idAdmin: "ID Quản Trị Viên",
      createdAt: "Ngày Tạo",
      updatedAt: "Ngày Cập Nhật",
    },
  };


  const renderDetailItem = (key, value) => {
    const label = fieldLabels[type]?.[key] || key;

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="detailItem" key={key}>
          <span className="itemKey">{label}:</span>
          <div className="itemValue">
            {Object.keys(value).map((subKey) => (
              <div key={subKey}>
                <span className="subItemKey">{subKey}:</span>
                <span className="subItemValue">{value[subKey]}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="detailItem" key={key}>
        <span className="itemKey">{label}:</span>
        <span className="itemValue">{value}</span>
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
                {data.img && (
                  <img
                    src={data.img || "https://via.placeholder.com/150"}
                    alt=""
                    className="itemImg"
                  />
                )}
                <div className="details">
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

export default SingleBooking;
