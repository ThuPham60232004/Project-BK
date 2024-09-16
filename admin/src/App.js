import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/hotelPages/home/Home';
import Login from './pages/hotelPages/login/Login';
import List from './pages/hotelPages/list/List';
import Single from './pages/hotelPages/single/Single';
import New from './pages/hotelPages/new/New';
import NewHotel from './pages/hotelPages/newHotel/NewHotel';
import NewRoom from './pages/hotelPages/newRoom/NewRoom';
import NewBooking from './pages/hotelPages/newbooking/Newbooking';
import BookingStatistics from './pages/hotelPages/BookingStatistics/BookingStatistics';
import BookingStatistics1 from './pages/hotelPages/BookingStatistics1/BookingStatistics';
import SingleNotifications from './pages/hotelPages/singlenotifications/Singlenotifications';
import SingleReviews from './pages/hotelPages/singlereviews/Singlereviews';
import SingleHotel from './pages/hotelPages/singlehotel/SingleHotel';
import SingleRoom from './pages/hotelPages/singleroom/SingleRoom';
import SingleBooking from './pages/hotelPages/singlebooking/SingleBooking';
import UserProfile from "./pages/hotelPages/userProfile/UserProfile";
import SingleDiscountCode from './pages/hotelPages/SingleDiscountCode/SingleDiscountCode';
import NewDiscountCode from './pages/hotelPages/NewDiscountCode/NewDiscountCode';
import NewNotifications from './pages/hotelPages/newnotifications/newnotifications';
import NewReviews from './pages/hotelPages/newreviews/Newreviews';
import { userInputs, hotelInputs, roomInputs, bookingInputs, discountcodeInputs, reviewInputs, notificationInputs } from './formSource'; // Import các inputs từ formSource
import './style/dark.css';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { hotelColumns, roomColumns, userColumns, bookingColumns, reviewwwwColumns, notificationColumns, discountCodeColumns } from './datatablesource'; // Import các cột dữ liệu từ datatablesource
import ReviewManager from './pages/hotelPages/ReviewManager/ReviewManager.jsx';
import SelectHotel from './pages/hotelPages/SelectHotel/SelectHotel';
import RoomList from './pages/hotelPages/RoomList/RoomList';
import List2 from './pages/hotelPages/list2/List';
import ReviewList from './pages/hotelPages/ReviewList/ReviewList.jsx';
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const userId = localStorage.getItem("userId");

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* Route cho admin */}
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="users">
              <Route index element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single type="user" /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><New inputs={userInputs} title="Thêm Người Dùng Mới" /></ProtectedRoute>} />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute><List2 columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=":hotelId" element={<ProtectedRoute><SingleHotel type="hotel" /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewHotel inputs={hotelInputs} title="Thêm Khách Sạn Mới" /></ProtectedRoute>} />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoute><List columns={roomColumns} /></ProtectedRoute>} />
              <Route path=":roomId" element={<ProtectedRoute><SingleRoom type="room" /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewRoom inputs={roomInputs} title="Thêm Phòng Mới" /></ProtectedRoute>} />
            </Route>
            <Route path="bookings">
              <Route index element={<ProtectedRoute><List columns={bookingColumns} /></ProtectedRoute>} />
              <Route path=":bookingId" element={<ProtectedRoute><SingleBooking type="booking" /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewBooking inputs={bookingInputs} title="Tạo Đặt Phòng Mới" /></ProtectedRoute>} />
            </Route>
            <Route path="/review" element={<ReviewManager />} />
              <Route path="new" element={<ProtectedRoute><NewReviews inputs={reviewInputs} title="Thêm Đánh Giá Mới" /></ProtectedRoute>} />
            <Route path="/reviewlist" element={<ReviewList />} />
            <Route path="notifications">
              <Route index element={<ProtectedRoute><List columns={notificationColumns} /></ProtectedRoute>} />
              <Route path=":notificationId" element={<ProtectedRoute><SingleNotifications /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewNotifications inputs={notificationInputs} title="Thêm Thông Báo Mới" /></ProtectedRoute>} />
            </Route>
            <Route path="statistics" element={<ProtectedRoute><BookingStatistics /></ProtectedRoute>} />
            <Route path="statistics1" element={<ProtectedRoute><BookingStatistics1 /></ProtectedRoute>} />ZZ
            <Route path="discounts">
              <Route index element={<ProtectedRoute><List columns={discountCodeColumns} /></ProtectedRoute>} />
              <Route path=":discountCodeId" element={<ProtectedRoute><SingleDiscountCode /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewDiscountCode inputs={discountcodeInputs} title="Thêm Mã Giảm Giá Mới" /></ProtectedRoute>} />
            </Route>
            <Route path="/select-hotel" element={<SelectHotel />} />
            <Route path="/roo/:hotelId" element={<RoomList />} />     
           </Route>
          <Route path="/profile" element={<UserProfile userId={userId} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
