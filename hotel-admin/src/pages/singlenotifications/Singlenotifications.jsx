import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EditModal from "../../components/EditModal/EditModal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleNotification = () => {
  const { notificationId } = useParams(); 
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("Thông Tin Thông Báo");
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!notificationId) {
      console.error("notificationId không được xác định");
      return;
    }

    setUrl(`http://localhost:9000/api/notifications/${notificationId}`);  // Đảm bảo URL chính xác

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        console.error(err);
        toast.error(`Lỗi khi tải thông tin: ${err.message}`);
      }
    };

    fetchData();
  }, [notificationId, url]);

  const handleEditButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = (updatedData) => {
    setData(updatedData);
    setShowModal(false);
    toast.success("Chỉnh sửa thành công!");
  };

  const handleSaveError = (error) => {
    toast.error(`Chỉnh sửa thất bại: ${error.message}`);
  };

  const fieldLabels = {
    message: "Nội dung",
    userId: "ID Người dùng",
    createdAt: "Ngày tạo",
    updatedAt:"Ngày cập nhập",
    user:"Id người dùng",
    isRead:"Đánh dấu đã đọc"
  };

  const renderDetailItem = (key, value) => {
    const label = fieldLabels[key] || key;
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
                <div className="details">
                  <h1 className="itemTitle">{data.message}</h1>
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
          type={title}
          url={url}
          onClose={handleCloseModal}
          onSave={handleSave}
          onError={handleSaveError}
        />
      )}
    </div>
  );
};

export default SingleNotification;
