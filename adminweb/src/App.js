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
        </Route>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
