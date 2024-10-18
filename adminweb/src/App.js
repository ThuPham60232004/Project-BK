import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage/HomePage'
import ListUser from "./components/HotelComponent/List/ListUser/ListUser";
import ListNotification from "./components/HotelComponent/List/ListNotification/ListNotification";
import ListDiscountCode from "./components/HotelComponent/List/ListDiscountCode/ListDiscountCode";
import ListReview from "./components/HotelComponent/List/ListReview/ListReview";
import ListHotel from "./components/HotelComponent/List/ListHotel/ListHotel";
import NewHotels from "./components/HotelComponent/New/NewHotels/NewHotels";
import Login from "./pages/login/Login";
import SingleHotelRoom from "./components/HotelComponent/Single/SingleHotelRoom/SingleHotelRoom";
import SingleNotification from "./components/HotelComponent/Single/SingleNotification/SingleNotification";
import NewNotification from "./components/HotelComponent/New/NewNotification/NewNotification";
import SingleDiscountCode from "./components/HotelComponent/Single/SingleDiscountCode/SingleDiscountCode";
import NewDiscountCode from "./components/HotelComponent/New/NewDiscountCode/NewDiscountCode";
import NewReview from "./components/HotelComponent/New/NewReview/NewReview";
import SingleReview from "./components/HotelComponent/Single/SingleReview/SingleReview";
import NewUser from "./components/HotelComponent/New/NewUser/NewUser";
import SingleUser from "./components/HotelComponent/Single/SingleUser/SingleUser";
import NewRooms from "./components/HotelComponent/New/NewRooms/NewRooms";
import RevenueChart from "./components/HotelComponent/Chart/revenueChart/revenueChart";
import UserProfile from "./components/userProfile/UserProfile";
import DashboardHotel from "./pages/DashboardHotel/DashboardHotel";
import ListRoomDashboard from "./components/DashboardHotelComponent/ListDashboard/ListRoomDashboard/ListRoomDashboard";
import ListNotificationDashboard from "./components/DashboardHotelComponent/ListDashboard/ListNotificationDashboardDashboard/ListNotificationDashboard";
import ListDiscountCodeDashboard from "./components/DashboardHotelComponent/ListDashboard/ListDiscountCodeDashboard/ListDiscountCodeDashboard";
import ListReviewDashboard from "./components/DashboardHotelComponent/ListDashboard/ListReviewDashboard/ListReviewDashboard";
import ListHotelDashboard from "./components/DashboardHotelComponent/ListDashboard/ListHotelDashboard/ListHotelDashboard";
import RevenueChartDashboard from "./components/DashboardHotelComponent/ChartDashboard/revenueChartDashboard/revenueChartDashboard"
import ListBookingDashboard from "./components/DashboardHotelComponent/ListDashboard/ListBookingDashboard/ListBookingDashboard";
import UserActivityStats from "./components/HotelComponent/Chart/UserActivityStats/UserActivityStats";
import ListBooking from "./components/HotelComponent/List/ListBooking/ListBooking";
import StatusRoom from "./components/HotelComponent/Status/StatusRoom/StatusRoom";
import StatusBooking from "./components/HotelComponent/Status/StatusBooking/StatusBooking";
import ListRoom from "./components/HotelComponent/List/ListRoom/ListRoom";
import NewBooking from "./components/HotelComponent/New/NewBooking/NewBooking";
import SingleBooking from "./components/HotelComponent/Single/SingleBooking/SingleBooking";
import SingleRoom from "./components/HotelComponent/Single/SingleRoom/SingleRoom";
import StatusBookingDashboard from "./components/DashboardHotelComponent/StatusDashboard/StatusBookingDashboard/StatusBookingDashboard";
import StatusRoomDashboard from "./components/DashboardHotelComponent/StatusDashboard/StatusRoomDashboard/StatusRoomDashboard";
import DashboardHome2 from "./pages/DashboardHotel/ DashboardHome/DashboardHome";
import DashboardHome1 from "./pages/HomePage/ DashboardHome/DashboardHome";
function App() {
  const userId = localStorage.getItem("userId");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="ListUser" element={<ListUser />} />

          <Route path="DashboardHome1" element={<DashboardHome1 />} />
        {/* LIST----------------------------------------- */}
          <Route path="ListUser" element={<ListUser />} />
          <Route path="ListNotification" element={<ListNotification />} />
          <Route path="ListDiscountCode" element={<ListDiscountCode />} />
          <Route path="ListReview" element={<ListReview />} />
          <Route path="ListHotel" element={<ListHotel />} />
          <Route path="ListBooking" element={<ListBooking />} />
          <Route path="ListRoom" element={<ListRoom />} /> 
        {/* NEW----------------------------------------- */}
          <Route path="NewHotels" element={<NewHotels />} />
          <Route path="NewNotification" element={<NewNotification />} />
          <Route path="NewDiscountCode" element={<NewDiscountCode />} />
          <Route path="NewReview" element={<NewReview />} />
          <Route path="NewUser" element={<NewUser />} />
          <Route path="NewRooms" element={<NewRooms />} />
          <Route path="NewBookings" element={<NewBooking />} />
        {/* SINGLE----------------------------------------- */}
          <Route path="SingleHotelRoom/:id" element={<SingleHotelRoom />} />
          <Route path="SingleNotification/:id" element={<SingleNotification />} />
          <Route path="SingleDiscountCode/:id" element={<SingleDiscountCode />} />
          <Route path="SingleReview/:id" element={<SingleReview />} />
          <Route path="SingleUser/:id" element={<SingleUser />} />
          <Route path="SingleBooking/:id" element={<SingleBooking />} />
          <Route path="SingleRoom/:roomId" element={<SingleRoom />} />
         {/* CHART----------------------------------------- */}
         <Route path="RevenueChart" element={<RevenueChart />} />
         <Route path="UserActivityStats" element={<UserActivityStats />} />
          {/* USER PROFILE----------------------------------------- */}
         <Route path="UserProfile" element={<UserProfile />} />
         {/* STATUS----------------------------------------- */}
         <Route path="StatusRoom" element={<StatusRoom />} />
         <Route path="StatusBooking" element={<StatusBooking />} />
        </Route>
{/* Dashboard-------------------------------------------------------------------------------------------*/}
        <Route path="/DashboardHotel" element={<DashboardHotel />}>
        <Route path="DashboardHome2" element={<DashboardHome2 />} />
        {/* LIST----------------------------------------- */}
        <Route path="ListRoomDashboard" element={<ListRoomDashboard />} />
          <Route path="ListNotificationDashboard" element={<ListNotificationDashboard />} />
          <Route path="ListDiscountCodeDashboard" element={<ListDiscountCodeDashboard />} />
          <Route path="ListReviewDashboard" element={<ListReviewDashboard />} />
          <Route path="ListHotelDashboard" element={<ListHotelDashboard />} />
          <Route path="ListBookingDashboard" element={<ListBookingDashboard/>} />
        {/* NEW----------------------------------------- */}
          <Route path="NewHotelsDashboard" element={<NewHotels />} />
          <Route path="NewNotificationDashboard" element={<NewNotification />} />
          <Route path="NewDiscountCodeDashboard" element={<NewDiscountCode />} />
          <Route path="NewReviewDashboard" element={<NewReview />} />
          <Route path="NewUseDashboardr" element={<NewUser />} />
          <Route path="NewRoomsDashboard" element={<NewRooms />} />
          <Route path="NewBookingsDashboard" element={<NewBooking />} />
        {/* SINGLE----------------------------------------- */}
          <Route path="SingleHotelRoomDashboard/:id" element={<SingleHotelRoom />} />
          <Route path="SingleNotificationDashboard/:id" element={<SingleNotification />} />
          <Route path="SingleDiscountCodeDashboard/:id" element={<SingleDiscountCode/>} />
          <Route path="SingleReviewDashboard/:id" element={<SingleReview />} />
          <Route path="SingleBookingDashboard/:id" element={<SingleBooking/>} />
          <Route path="SingleRoomDashboard/:roomId" element={<SingleRoom />} />
          {/* CHART----------------------------------------- */}
         <Route path="RevenueChartDashboard" element={<RevenueChartDashboard />} />
         <Route path="UserProfile" element={<UserProfile />} />
          {/* STATUS----------------------------------------- */}
          <Route path="StatusRoomDashboard" element={<StatusRoomDashboard />} />
         <Route path="StatusBookingDashboard" element={<StatusBookingDashboard />} />
        </Route>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
