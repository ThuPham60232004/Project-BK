import React, { useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import './navBarDashboardHotel.css';
import { useNavigate } from 'react-router-dom';

const NavBarDashboardHotel = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    dispatch({ type: "LOGOUT" });
    navigate('/Login'); 
  };

  return (
    <div className='NavBarDashboardHotel NavBar'>
      <div className='NavBarDashboardHotelContainer'>
        <div className='NavBarDashboardHotelContainerLeft'>
          <img 
            src='/nft-image-1.png' 
            alt='logo'
            className='NavBarDashboardHotelLogo'
          />
          <h4>ADMIN HOTEL</h4>
        </div>
        <div className='NavBarDashboardHotelInputSearch'>
        
        </div>
        <div className='NavBarDashboardHotelRight'>
          <div className='NavBarDashboardHotelNotification'>
          </div>
          <div className='NavBarDashboardHotelProfile'>
            {user ? (
              <>
                {user.img && <img src={user.img} alt="User" className="NavBarDashboardHotelUserImage" />}
                <span>{user.username}</span>
                <button className='NavBarDashboardHotelbutton'onClick={handleLogout}>Đăng xuất</button>
              </>
            ) : (
              <>
                <button className='NavBarDashboardHotelbutton' onClick={() => navigate('/Login')}>Đăng nhập</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarDashboardHotel;
