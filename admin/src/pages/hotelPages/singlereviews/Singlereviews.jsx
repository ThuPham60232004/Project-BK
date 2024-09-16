import "./single.css";
import Sidebar from "../../../components/hotelcomponents/sidebar/Sidebar";
import Navbar from "../../../components/hotelcomponents/navbar/Navbar";
import EditModal from "../../../components/hotelcomponents/EditModal/EditModal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleReview = () => {
  const { reviewId } = useParams(); // Lấy reviewId từ URL
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("Thông Tin Đánh Giá");
  const [url, setUrl] = useState(`/reviews/${reviewId}`); // Đảm bảo URL chính xác
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!reviewId) {
      console.error("Id đánh giá không được xác định");
      return;
    }

    setUrl(`/reviews/${reviewId}`); // Đặt URL dựa trên reviewId

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data.review); // Cập nhật dữ liệu với `res.data.review`
      } catch (err) {
        console.error(err);
        toast.error(`Lỗi khi tải thông tin: ${err.message}`); // Thông báo lỗi khi tải dữ liệu
      }
    };

    fetchData();
  }, [reviewId, url]); // Thêm reviewId vào dependency để theo dõi sự thay đổi

  const handleEditButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = (updatedData) => {
    setData(updatedData);
    setShowModal(false);
    toast.success("Chỉnh sửa thành công!"); // Thông báo thành công khi chỉnh sửa dữ liệu
  };

  const handleSaveError = (error) => {
    toast.error(`Chỉnh sửa thất bại: ${error.message}`); // Thông báo lỗi khi chỉnh sửa thất bại
  };

  const fieldLabels = {
    comment: "Bình luận",
    rating: "Đánh giá",
    userId: "ID Người dùng",
    hotelId: "ID Khách sạn",
    createdAt:"Ngày tạo",
    updatedAt:"Ngày cập nhập"
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
                  <h1 className="itemTitle">{data.comment}</h1>
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

export default SingleReview;
