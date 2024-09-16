import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import NewHotel from './pages/newHotel/NewHotel';
import NewRoom from './pages/newRoom/NewRoom';
import NewBooking from './pages/newbooking/Newbooking';
import BookingStatistics from './pages/BookingStatistics/BookingStatistics';
import BookingStatistics1 from './pages/BookingStatistics1/BookingStatistics';
import SingleNotifications from './pages/singlenotifications/Singlenotifications';
import SingleReviews from './pages/singlereviews/Singlereviews';
import SingleHotel from './pages/singlehotel/SingleHotel';
import SingleRoom from './pages/singleroom/SingleRoom';
import SingleBooking from './pages/singlebooking/SingleBooking';
import UserProfile from "./pages/userProfile/UserProfile";
import SingleDiscountCode from './pages/SingleDiscountCode/SingleDiscountCode';
import NewDiscountCode from './pages/NewDiscountCode/NewDiscountCode';
import NewNotifications from './pages/newnotifications/newnotifications';
import NewReviews from './pages/newreviews/Newreviews';
import { userInputs, hotelInputs, roomInputs, bookingInputs, discountcodeInputs, reviewInputs, notificationInputs } from './formSource'; // Import các inputs từ formSource
import './style/dark.css';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { hotelColumns, roomColumns, userColumns, bookingColumns, reviewwwwColumns, notificationColumns, discountCodeColumns } from './datatablesource'; // Import các cột dữ liệu từ datatablesource
import ReviewManager from './pages/ReviewManager/ReviewManager.jsx';
import SelectHotel from './pages/SelectHotel/SelectHotel';
import RoomList from './pages/RoomList/RoomList';
import List2 from './pages/list2/List';
import ReviewList from './pages/ReviewList/ReviewList.jsx';
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
