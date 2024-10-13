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
import Register from "./pages/register/Register";
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
import ListUserDashboard from "./components/DashboardHotelComponent/ListDashboard/ListUserDashboard/ListUserDashboard";
import ListNotificationDashboard from "./components/DashboardHotelComponent/ListDashboard/ListNotificationDashboardDashboard/ListNotificationDashboard";
import ListDiscountCodeDashboard from "./components/DashboardHotelComponent/ListDashboard/ListDiscountCodeDashboard/ListDiscountCodeDashboard";
import ListReviewDashboard from "./components/DashboardHotelComponent/ListDashboard/ListReviewDashboard/ListReviewDashboard";
import ListHotelDashboard from "./components/DashboardHotelComponent/ListDashboard/ListHotelDashboard/ListHotelDashboard";
import NewHotelsDashboard from "./components/DashboardHotelComponent/NewDashboard/NewHotelsDashboard/NewHotelsDashboard";
import NewNotificationDashboard from "./components/DashboardHotelComponent/NewDashboard/NewNotificationDashboard/NewNotificationDashboard";
import NewDiscountCodeDashboard from "./components/DashboardHotelComponent/NewDashboard/NewDiscountCodeDashboard/NewDiscountCode";
import NewReviewDashboard from "./components/DashboardHotelComponent/NewDashboard/NewReviewDashboard/NewReviewDashboard";
import NewUserDashboard from "./components/DashboardHotelComponent/NewDashboard/NewUserDashboard/NewUserDashboard";
import NewRoomsDashboard from "./components/DashboardHotelComponent/NewDashboard/NewRoomsDashboard/NewRoomsDashboard";
import SingleHotelRoomDashboard from "./components/DashboardHotelComponent/SingleDashboard/SingleHotelRoomDashboard/SingleHotelRoomDashboard";
import SingleNotificationDashboard from "./components/DashboardHotelComponent/SingleDashboard/SingleNotificationDashboard/SingleNotificationDashboard";
import SingleDiscountCodeDashboard from "./components/DashboardHotelComponent/SingleDashboard/SingleDiscountCodeDashboard/SingleDiscountCodeDashboard";
import SingleReviewDashboard from "./components/DashboardHotelComponent/SingleDashboard/SingleReviewDashboard/SingleReviewDashboard";
import SingleUserDashboard from "./components/DashboardHotelComponent/SingleDashboard/SingleUserDashboard/SingleUserDashboard";
import RevenueChartDashboard from "./components/DashboardHotelComponent/ChartDashboard/revenueChartDashboard/revenueChartDashboard"
import ListBookingDashboard from "./components/DashboardHotelComponent/ListDashboard/ListBookingDashboard/ListBookingDashboard";
import UserActivityStats from "./components/HotelComponent/Chart/UserActivityStats/UserActivityStats";
import ListBooking from "./components/HotelComponent/List/ListBooking/ListBooking";
import StatusRoom from "./components/HotelComponent/Status/StatusRoom/StatusRoom";
import StatusBooking from "./components/HotelComponent/Status/StatusBooking/StatusBooking";
import ListRoom from "./components/HotelComponent/List/ListRoom/ListRoom";
import NewBooking from "./components/HotelComponent/New/NewBooking/NewBooking";

function App() {
  const userId = localStorage.getItem("userId");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
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
          <Route path="SingleHotelRoom" element={<SingleHotelRoom />} />
          <Route path="SingleNotification" element={<SingleNotification />} />
          <Route path="SingleDiscountCode" element={<SingleDiscountCode />} />
          <Route path="SingleReview" element={<SingleReview />} />
          <Route path="SingleUser" element={<SingleUser />} />
         {/* CHART----------------------------------------- */}
         <Route path="RevenueChart" element={<RevenueChart />} />
         <Route path="UserActivityStats" element={<UserActivityStats />} />
          {/* USER PROFILE----------------------------------------- */}
         <Route path="UserProfile" element={<UserProfile />} />
         {/* STATUS----------------------------------------- */}
         <Route path="StatusRoom" element={<StatusRoom />} />
         <Route path="StatusBooking" element={<StatusBooking />} />
        </Route>
        <Route path="/DashboardHotel" element={<DashboardHotel />}>
        {/* LIST----------------------------------------- */}
        <Route path="ListUserDashboard" element={<ListUserDashboard />} />
          <Route path="ListNotificationDashboard" element={<ListNotificationDashboard />} />
          <Route path="ListDiscountCodeDashboard" element={<ListDiscountCodeDashboard />} />
          <Route path="ListReviewDashboard" element={<ListReviewDashboard />} />
          <Route path="ListHotelDashboard" element={<ListHotelDashboard />} />
          <Route path="ListBookingDashboard" element={<ListBookingDashboard/>} />
        {/* NEW----------------------------------------- */}
          <Route path="NewHotelsDashboard" element={<NewHotelsDashboard />} />
          <Route path="NewNotificationDashboard" element={<NewNotificationDashboard />} />
          <Route path="NewDiscountCodeDashboard" element={<NewDiscountCodeDashboard />} />
          <Route path="NewReviewDashboard" element={<NewReviewDashboard />} />
          <Route path="NewUseDashboardr" element={<NewUserDashboard />} />
          <Route path="NewRoomsDashboard" element={<NewRoomsDashboard />} />
        {/* SINGLE----------------------------------------- */}
          <Route path="SingleHotelRoomDashboard" element={<SingleHotelRoomDashboard />} />
          <Route path="SingleNotificationDashboard" element={<SingleNotificationDashboard />} />
          <Route path="SingleDiscountCodeDashboard" element={<SingleDiscountCodeDashboard />} />
          <Route path="SingleReviewDashboard" element={<SingleReviewDashboard />} />
          <Route path="SingleUserDashboard" element={<SingleUserDashboard />} />
          {/* CHART----------------------------------------- */}
         <Route path="RevenueChartDashboard" element={<RevenueChartDashboard />} />
         <Route path="UserProfile" element={<UserProfile />} />
        </Route>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
