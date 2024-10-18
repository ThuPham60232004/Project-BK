import React, { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./UserProfile.css";
import Navbar from "../../components/HotelComponents/navbar/Navbar";

const UserProfile = ({ userId: propUserId }) => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(propUserId || localStorage.getItem('userId'));
        setUser(data);
        setEditedUser({ ...data });
      } catch (error) {
        console.error("Không Tìm Thấy Thông Tin Người Dùng", error);
        toast.error("Không Tìm Thấy Thông Tin Người Dùng");
      }
    };

    if (propUserId || localStorage.getItem('userId')) {
      fetchUserInfo();
    }
  }, [propUserId]);

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = propUserId || localStorage.getItem('userId');
      if (!userId) throw new Error("Không tìm thấy userId");
      const updatedUser = await updateUserInfo(userId, editedUser);
      setUser(updatedUser);
      setEditMode(false);
      toast.success("Cập nhật thông tin người dùng thành công");
    } catch (error) {
      console.error("Không cập nhật được thông tin người dùng", error);
      toast.error("Không cập nhật được thông tin người dùng");
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  if (!propUserId && !localStorage.getItem('userId')) {
    return <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>;
  }

  if (!user) {
    return <p>Đang tải...</p>;
  }

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="userProfile">
        <ToastContainer />
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <label>
              Hình ảnh:
              <input
                type="text"
                name="img"
                value={editedUser.img}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Tên người dùng:
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Quốc gia:
              <input
                type="text"
                name="country"
                value={editedUser.country}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Thành phố:
              <input
                type="text"
                name="city"
                value={editedUser.city}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Số điện thoại:
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Lưu</button>
          </form>
        ) : (
          <div className="userInfo">
            <div
              className="userImg"
              style={{ backgroundImage: `url(${user.img})` }}
            ></div>
            <p><strong>Tên người dùng:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Quốc gia:</strong> {user.country}</p>
            <p><strong>Thành phố:</strong> {user.city}</p>
            <p><strong>Số điện thoại:</strong> {user.phone}</p>
            <button onClick={handleEditClick}>Chỉnh sửa</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
