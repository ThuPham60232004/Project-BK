import Footer from "../../../components/footer/Footer.jsx";
import Header from "../../../components/HotelComponents/header/Header.jsx";
import MailList from "../../../components/mailList/MailList.jsx";
import Navbar from "../../../components/HotelComponents/navbar/Navbar.jsx";
import FullHotel from "../../../components/HotelComponents/FullHotel/fullhotel.jsx";
import "./DetailHotel.css";
const DetailHotel = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
       <FullHotel/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default DetailHotel;
