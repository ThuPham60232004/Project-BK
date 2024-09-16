import "./newHotel.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewHotel = () => {
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState("");  
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/rooms");
  
  const userId = localStorage.getItem('userId'); // Fetch userId from localStorage

  useEffect(() => {
    if (imageUrl) {
      setFiles((prevFiles) => [...prevFiles, { url: imageUrl }]);
      setImageUrl("");  // Clear the URL input field
    }
  }, [imageUrl]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...e.target.files]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Prepare images for upload
      const imageUploadPromises = files.map(async (file) => {
        if (file.url) {
          return file.url;
        } else {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dg3uzcrrs/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        }
      });

      const list = await Promise.all(imageUploadPromises);

      const newHotel = {
        ...info,
        rooms,
        photos: list,
        idAdmin: userId,  // Include userId as idAdmin
      };

      await axios.post("/hotels", newHotel);
      toast.success("Sản phẩm mới đã được tạo thành công!");
    } catch (err) {
      console.log(err);
      toast.error("Không tạo được sản phẩm mới.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm Sản Phẩm Mới</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="imagePreview">
              {files.map((file, index) => (
                <img
                  key={index}
                  src={file.url ? file.url : URL.createObjectURL(file)}
                  alt=""
                />
              ))}
              {!files.length && (
                <img
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt=""
                />
              )}
            </div>
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
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Nhập đường dẫn hình ảnh"
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    value={input.value}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Đặc sắc</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>Không</option>
                  <option value={true}>Đồng ý</option>
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

export default NewHotel;
