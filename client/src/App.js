import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/HotelProject/home/Home";
import Hotel from "./pages/HotelProject/hotel/Hotel";
import List from "./pages/HotelProject/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/HotelProject/ForgotPassword/ForgotPassword";
import VerifyCode from "./pages/HotelProject/VerifyCode/VerifyCode";
import AboutUs from "./pages/HotelProject/AboutUs/aboutus";
import DetailHotel from "./pages/HotelProject/DetailHotel/DetailHotel";
import BookingHistory from "./pages/HotelProject/BookingHistory/BookingHistory";
import UserProfile from "./pages/userProfile/UserProfile";
import Notifications from './pages/HotelProject/Notifications/Notifications';
import ReviewManager from './pages/HotelProject/ReviewManager/ReviewManager';
import DiscountCodeList from "./pages/HotelProject/DiscountCodeList/DiscountCodeList";
import Room from "./pages/HotelProject/room/room";

import TicketDetail from './pages/AirplaneProject/TicketDetailAirplane/TicketDetail';
import List11 from "./pages/AirplaneProject/listAirplane/List"
import HomeAirplane from "./pages/AirplaneProject/homeAirplane/Home"
import FlightTickets from './pages/AirplaneProject/FlightTickets/FlightTickets';
import DiscountCodeAirplanes from './pages/AirplaneProject/DiscountCodeList/DiscountCodeList';
import BookingModal from './components/AirplaneComponent/BookingModal/BookingModal';
function App() {
  const userId = localStorage.getItem("userId");

  // Chức năng thông báo 
  const handleError = (errorMessage) => {
    toast.error(errorMessage);
  };

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/profile" element={<UserProfile userId={userId}  />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/notifications" element={<Notifications />} />
        {/*Routes hotel*/}
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/detailhotel" element={<DetailHotel />} />
          <Route path="/booking-history" element={<BookingHistory userId={userId} />} />
          <Route path="/review" element={<ReviewManager />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verifycode" element={<VerifyCode />} />
          <Route path="/discountcodelist" element={<DiscountCodeList/>} />
          <Route path="/rooms/:id" element={<Room/>} />
        {/*Routes airplane*/}
          <Route path="/airplanesearch" element={<List11/>}/>
          <Route path="/Tickets/getTicket/:id" element={<TicketDetail />} />
          <Route path="/homeairplane" element={<HomeAirplane/>}/>  
          <Route path='/FlightTickets' element={<FlightTickets/>}/> 
          <Route path='/DiscountCodeAirplanes' element={<DiscountCodeAirplanes/>}/>
          <Route path="/booking/:id" element={<BookingModal />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
