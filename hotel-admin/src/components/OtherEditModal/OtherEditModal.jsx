import React, { useState, useEffect } from "react";
import "./editModal.css";
import axios from "axios";

const OtherEditModal = ({ data, url, onClose, onSave, onError }) => {
  const [formData, setFormData] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormData(data); // Update formData when data changes
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoomNumbersChange = (index, field, value) => {
    const newRoomNumbers = [...formData.roomNumbers];
    newRoomNumbers[index] = {
      ...newRoomNumbers[index],
      [field]: field === 'unavailableDates' ? value.split(',').map(date => new Date(date).toISOString()) : value,
    };
    setFormData({
      ...formData,
      roomNumbers: newRoomNumbers,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(url, formData);
      onSave(formData); // Call onSave with updated data
      onClose(); // Close modal after successful save
    } catch (err) {
      setErrorMessage("Chỉnh sửa thất bại. Vui lòng thử lại.");
      onError(err); // Call onError with error
    }
  };

  return (
    <div className="editModal">
      <div className="modalContent">
        <h2>Chỉnh Sửa Thông Tin</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            key !== 'roomNumbers' && (
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
            )
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

export default OtherEditModal;
