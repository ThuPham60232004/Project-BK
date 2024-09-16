import { FaFacebookF } from "react-icons/fa"; // Ensure these icons are imported
import { SiZalo } from "react-icons/si"; // Ensure these icons are imported
import Featured from "../../../components/HotelComponents/featured/Featured";
import FeaturedProperties from "../../../components/HotelComponents/featuredProperties/FeaturedProperties";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/HotelComponents/header/Header";
import MailList from "../../../components/mailList/MailList";
import Navbar from "../../../components/HotelComponents/navbar/Navbar";
import PropertyList from "../../../components/HotelComponents/propertyList/PropertyList";
import "./home.css";
import Service from "../../../components/HotelComponents/Service/Service"
import DiscountCode from "../../../components/HotelComponents/DiscountCodeList/DiscountCodeList"
import Testimonials from "../../../components/Testimonials/Testimonials";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <Testimonials/>
        <PropertyList />
        <Service/>
        <DiscountCode/>
        <FeaturedProperties />
        <MailList />
        <br />
        <br />
        <Footer />
       <div className="ContainerIcon">
       <div className="socialIcons">
          <a href="https://www.facebook.com/profile.php?id=61560064451909&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
            <button className="socialButton fbButton">
              <FaFacebookF />
            </button>
          </a>
          <a href="https://zalo.me/yourprofile" target="_blank" rel="noopener noreferrer">
            <button className="socialButton zaloButton">
              <SiZalo />
            </button>
          </a>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Home;
