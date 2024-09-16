import "./singleRoom.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import OtherEditModal from "../../components/OtherEditModal/OtherEditModal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleRoom = () => {
  const { roomId } = useParams(); // Retrieve roomId from URL
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("Thông Tin Phòng");
  const [url, setUrl] = useState(`/rooms/${roomId}`);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [editableData, setEditableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        console.error(err);
        toast.error(`Lỗi khi tải thông tin: ${err.message}`);
      }
    };

    if (roomId) {
      fetchData();
    }
  }, [roomId, url]);

  const handleEditOtherClick = () => {
    setEditableData(data);
    setShowOtherModal(true);
  };

  const handleCloseOtherModal = () => {
    setShowOtherModal(false);
  };

  const handleSave = async (updatedData) => {
    try {
      await axios.put(url, updatedData);
      setData(updatedData);
      setShowOtherModal(false);
      toast.success("Chỉnh sửa thành công!");
    } catch (err) {
      toast.error(`Chỉnh sửa thất bại: ${err.message}`);
    }
  };

  const handleSaveError = (error) => {
    toast.error(`Chỉnh sửa thất bại: ${error.message}`);
  };

  const fieldLabels = {
    numberOfReviews:"Số người đánh giá",
    img: "Hình Ảnh",
    desc:"Nội dung",
    name: "Tên",
    title: "Tiêu Đề",
    description: "Mô Tả",
    price: "Giá",
    roomNumbers: "Phòng",
    discountPrice:"Giá đã giảm",
    taxPrice:"Giá thuế",
    maxPeople:"Tổng số người",
    unavailableDates: "Những ngày phòng đã được đặt",
  };

  const renderDetailItem = (key, value) => {
    const label = fieldLabels[key] || key;

    if (key === 'roomNumbers') {
      return (
        <div key={key}>
          <span className="itemKey">{label}:</span>
          <div>
            {value.map((room, index) => (
              <div key={index}>
                <div><strong>Số Phòng:</strong> {room.number}</div>
                <div><strong>Những ngày phòng đã được đặt:</strong> {room.unavailableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return (
          <ul key={key}>
            {value.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        );
      } else {
        return (
          <div key={key}>
            <span className="itemSubKey">{label}:</span>
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey}>
                <span className="itemSubKey">{subKey}:</span>
                <span className="itemSubValue">{JSON.stringify(subValue)}</span>
              </div>
            ))}
          </div>
        );
      }
    } else {
      return (
        <div className="detailItem" key={key}>
          <span className="itemKey">{label}:</span>
          <span className="itemValue">{value}</span>
        </div>
      );
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleEditOtherClick}>Chỉnh Sửa</div>
            <h1 className="title">{title}</h1>
            {data ? (
              <div className="item">
                <img
                  src={data.img || "https://via.placeholder.com/150"}
                  alt=""
                  className="itemImg"/>
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
      </div>
      {showOtherModal && (
        <OtherEditModal
          data={editableData}
          url={url}
          onClose={handleCloseOtherModal}
          onSave={handleSave}
          onError={handleSaveError}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default SingleRoom;
