import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/HotelProject/home/Home";
import Hotel from "./pages/HotelProject/hotel/Hotel";
import List from "./pages/HotelProject/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/HotelProject/ForgotPassword/ForgotPassword";
import AboutUs from "./pages/HotelProject/AboutUs/aboutus";
import DetailHotel from "./pages/HotelProject/DetailHotel/DetailHotel";
import BookingHistory from "./pages/HotelProject/BookingHistory/BookingHistory";
import UserProfile from "./pages/userProfile/UserProfile";
import Notifications from './pages/HotelProject/Notifications/Notifications';
import DiscountCodeList from "./pages/HotelProject/DiscountCodeList/DiscountCodeList";
import Room from "./pages/HotelProject/room/room";
import HotelTypeList from './components/HotelComponents/HotelTypeList/HotelTypeList';
import TicketDetail from './pages/AirplaneProject/TicketDetailAirplane/TicketDetail';
import List11 from "./pages/AirplaneProject/listAirplane/List";
import HomeAirplane from "./pages/AirplaneProject/homeAirplane/Home";
import FlightTickets from './pages/AirplaneProject/FlightTickets/FlightTickets';
import DiscountCodeAirplanes from './pages/AirplaneProject/DiscountCodeList/DiscountCodeList';
import BookingModal from './components/AirplaneComponent/BookingModal/BookingModal';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import { logActivity } from "../src/services/UserActivity.js";
import Review from './pages/Reviews/Reviews.jsx';
import PaymentScreen from './components/PaymentScreen/PaymentScreen.jsx';
import OTPScreen from './components/OTPScreen/OTPScreen.jsx';
import TransferConfirmation from './components/TransferConfirmation/TransferConfirmation.jsx';
function App() {
  const userId = localStorage.getItem("userId");

  console.log('User ID:', userId);
  return (
    <BrowserRouter>
      <ActivityLogger userId={userId} />
      <Routes>
        <Route path="/profile" element={<UserProfile userId={userId} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/PaymentScreen" element={<PaymentScreen />} />
        <Route path="/TransferConfirmation" element={<TransferConfirmation />} />
        <Route path="/OTPScreen" element={<OTPScreen />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/*Routes hotel*/}
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/detailhotel" element={<DetailHotel />} />
        <Route path="/booking-history" element={<BookingHistory userId={userId} />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/discountcodelist" element={<DiscountCodeList />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="/typehotels/:type" element={<HotelTypeList />} />
        {/*Routes airplane*/}
        <Route path="/airplanesearch" element={<List11 />} />
        <Route path="/Tickets/getTicket/:id" element={<TicketDetail />} />
        <Route path="/homeairplane" element={<HomeAirplane />} />
        <Route path='/FlightTickets' element={<FlightTickets />} />
        <Route path='/DiscountCodeAirplanes' element={<DiscountCodeAirplanes />} />
        <Route path="/booking/:id" element={<BookingModal />} />
      </Routes>
    </BrowserRouter>
  );
}

function ActivityLogger({ userId }) {
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    if (!userId) {
      console.error("ID người dùng không có giá trị hoặc không được xác định, bỏ qua nhật ký hoạt động");
      return; 
    }

    logActivity(userId, location.pathname, 0);

    const handleActivityLog = () => {
      const duration = Date.now() - startTime;
      logActivity(userId, location.pathname, duration)
    };

    window.addEventListener('trước khi dỡ tải', handleActivityLog);

    return () => {
      handleActivityLog();
      window.removeEventListener('trước khi dỡ tải', handleActivityLog);
    };
  }, [location, userId]);

  return null;
}

export default App;
