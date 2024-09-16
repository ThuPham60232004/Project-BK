import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EditModal from "../../components/EditModal/EditModal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleDiscountCode = () => {
  const { discountCodeId } = useParams();
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("Thông Tin Mã Giảm Giá");
  const [url, setUrl] = useState(`/discounts/${discountCodeId}`);
  const [showModal, setShowModal] = useState(false);

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
  }, [discountCodeId, url]);

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

  const fieldLabels = {
    code: "Mã",
    discountType: "Loại Giảm Giá",
    discountValue: "Giá Trị Giảm",
    startDate: "Ngày Bắt Đầu",
    expirationDate: "Ngày Hết Hạn",
    amountDiscountCode: "Số Lượng Mã Giảm Giá",
    idAdmin: "ID Quản Trị Viên"
  };

  const renderDetailItem = (key, value) => {
    const label = fieldLabels[key] || key;
    return (
      <div className="detailItem" key={key}>
        <span className="itemKey">{label}:</span>
        <span className="itemValue">{Array.isArray(value) ? value.join(', ') : value}</span>
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
                  <h1 className="itemTitle">{data.code}</h1>
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

export default SingleDiscountCode;
