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

function App() {
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
        {/* NEW----------------------------------------- */}
          <Route path="NewHotels" element={<NewHotels />} />
          <Route path="NewNotification" element={<NewNotification />} />
          <Route path="NewDiscountCode" element={<NewDiscountCode />} />
          <Route path="NewReview" element={<NewReview />} />
          <Route path="NewUser" element={<NewUser />} />
          <Route path="NewRooms" element={<NewRooms />} />
        {/* SINGLE----------------------------------------- */}
          <Route path="SingleHotelRoom" element={<SingleHotelRoom />} />
          <Route path="SingleNotification" element={<SingleNotification />} />
          <Route path="SingleDiscountCode" element={<SingleDiscountCode />} />
          <Route path="SingleReview" element={<SingleReview />} />
          <Route path="SingleUser" element={<SingleUser />} />
         {/* CHART----------------------------------------- */}


         
        </Route>

        <Route path="/Register" element={<Register />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
