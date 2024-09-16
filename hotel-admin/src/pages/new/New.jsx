import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./new.css";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageUrl("");
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setFile("");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = imageUrl;

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dg3uzcrrs/image/upload",
          data
        );

        imgUrl = uploadRes.data.url;
      } catch (err) {
        console.log(err);
        toast.error("Tải lên hình ảnh thất bại!");
        return;
      }
    }

    const newUser = {
      ...info,
      img: imgUrl,
    };

    try {
      await axios.post("/auth/register", newUser);
      toast.success("Thêm người dùng thành công!");
    } catch (err) {
      console.log(err);
      toast.error("Thêm người dùng thất bại!");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : imageUrl || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  placeholder="Nhập URL hình ảnh"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Gửi</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default New;
