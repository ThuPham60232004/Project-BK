import React, { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "../../services/userService";
import "./UserProfile.css";

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
    } catch (error) {
      console.error("Không cập nhật được thông tin người dùng", error);
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
    <div style={{width:'100%', display:'flex',flexDirection:'column', gap:'20px'}}>
      <div className="userProfile">
        <h2 style={{padding:'20px', fontWeight:'800'}}>Cập nhật thông tin cá nhân</h2>
        {editMode ? (
          <form style={{width:'70%' ,padding:'20px', margin:'0 auto', display:'flex', flexDirection:'column',gap:'10px'}} onSubmit={handleSubmit}>
            <div style={{ width:'100%',display:'flex', alignItems:'center', gap:'10px', marginLeft:'0' ,  padding:'10px'}}>
              <label style={{width:'30%'}}>Hình ảnh:</label>
              <input style={{width:'70%', padding:'10px', borderRadius:'10px'}}
                type="text"
                name="img"
                value={editedUser.img}
                onChange={handleInputChange}
              />
            </div>

          <div style={{ width:'100%',display:'flex', alignItems:'center', gap:'10px', margin:'0' ,  padding:'10px'}}>
            <label style={{width:'30%'}}>Tên người dùng:  </label>
              <input style={{width:'70%', padding:'10px', borderRadius:'10px'}}
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
              />
            </div>
             <div style={{ width:'100%',display:'flex', alignItems:'center', gap:'10px', margin:'0' ,padding:'10px'}}>
            <label style={{width:'30%'}}>Email:  </label>
              <input style={{width:'70%', padding:'10px', borderRadius:'10px'}}
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
          
            </div>

             <div style={{ width:'100%',display:'flex', alignItems:'center', gap:'10px', margin:'0' , padding:'10px'}}>
                 <label style={{width:'30%'}}>
              Quốc gia:  </label>
              <input style={{width:'70%', padding:'10px', borderRadius:'10px'}}
                type="text"
                name="country"
                value={editedUser.country}
                onChange={handleInputChange}
              />
          
             </div>
           
            <div style={{ width:'100%',display:'flex', alignItems:'center', gap:'10px', margin:'0', padding:'10px'}}>
               <label style={{width:'30%'}}>
                  Thành phố: </label>
                  <input style={{width:'70%', padding:'10px', borderRadius:'10px'}}
                    type="text"
                    name="city"
                    value={editedUser.city}
                    onChange={handleInputChange}
                  />
               
            </div>
           
             <div style={{ width:'100%',display:'flex', alignItems:'center', gap:'10px', margin:'0' , padding:'10px'}}>
               <label style={{width:'30%'}}>
              Số điện thoại:  </label>
              <input style={{width:'70%', padding:'10px', borderRadius:'10px'}}
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
          
             </div>
           
            
            <button style={{width:'100%', padding:'10px', borderRadius:'20px', background:'green', color:'white', fontWeight:'800', border:'none', fontSize:'18px', marginTop:'20px'}} type="submit">Lưu</button>
          </form>
        ) : (
          <div style={{width:'100%',padding:'20px',margin:'0', display:'flex', gap:'20px'}} className="userInfo">
            <div className="userImg" style={{width:'50%', height:'350px',objectFit:'cover',padding:'0', margin:'0',borderRadius:'10px', backgroundImage: `url(${user.img})` }}>
            </div>
            <div style={{width:'50%', padding:'10px 30px', border: '1px solid gray', borderRadius:'10px'}} className="detail_info">
            <p style={{  padding: '5px 10px', borderBottom:'1px solid gray' }}><strong>Tên người dùng:</strong> {user.username}</p>
            <p style={{padding: '5px 10px', borderBottom: '1px solid gray'}}><strong>Số điện thoại:</strong> {user.phone}</p>
            <p style={{ padding: '5px 10px', borderBottom: '1px solid gray'}}><strong>Email:</strong> {user.email}</p>
            <p style={{ padding: '5px 10px', borderBottom: '1px solid gray'}}><strong>Quốc gia:</strong> {user.country}</p>
            <p style={{padding: '5px 10px', borderBottom: '1px solid gray' }}><strong>Thành phố:</strong> {user.city}</p>
            <button style={{ width:'100%', marginTop:'20px', marginBottom:'20px',padding:'10px',background:'green',color:'white', fontWeight:'800', border:'none', borderRadius:'16px', fontSize:'20px',fontWeight:'700'}} onClick={handleEditClick}>Chỉnh sửa</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;