import React, { useState, useEffect } from "react";
import "./editModal.css";
import axios from "axios";

const EditModal = ({ data, type, url, onClose, onSave, onError }) => {
  const [formData, setFormData] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormData(data);  // Cập nhật formData khi data thay đổi
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(url, formData);
      onSave(formData);  // Gọi hàm onSave với dữ liệu đã cập nhật
      onClose();  // Đóng modal sau khi lưu dữ liệu thành công
    } catch (err) {
      setErrorMessage("Chỉnh sửa thất bại. Vui lòng thử lại.");
      onError(err);  // Gọi hàm onError với lỗi xảy ra
    }
  };

  return (
    <div className="editModal">
      <div className="modalContent">
        <h2>Chỉnh Sửa {type}</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}  
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div className="formGroup" key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key] || ""}  
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="modalActions">
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
