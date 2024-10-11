import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import './navBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    dispatch({ type: "LOGOUT" });
    navigate('/Login'); 
  };

  return (
    <div className='NavBar'>
      <div className='NavBarContainer'>
        <div className='NavBarContainerLeft'>
          <img 
            src='/nft-image-1.png' 
            alt='logo'
            className='NavBarLogo'
          />
          <h2>BOOKING</h2>
        </div>
        <div className='NavBarInputSearch'>
        
        </div>
        <div className='NavBarRight'>
          <div className='NavBarNotification'>
          </div>
          <div className='NavBarProfile'>
            {user ? (
              <>
                {user.img && <img src={user.img} alt="User" className="NavBarUserImage" />}
                <span>{user.username}</span>
                <button className='navbarbutton'onClick={handleLogout}>Đăng xuất</button>
              </>
            ) : (
              <>
                <button className='navbarbutton' onClick={() => navigate('/Login')}>Đăng nhập</button>
                <button className='navbarbutton' onClick={() => navigate('/Register')}>Đăng ký</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
