import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/HotelComponents/navbar/Navbar";
import Header from "../../../components/HotelComponents/header/Header";
import MailList from "../../../components/mailList/MailList";
import Footer from "../../../components/footer/Footer";
import { SearchContext } from "../../../context/SearchContext";
import { AuthContext } from "../../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../../../hooks/useFetch";
import "./hotel.css";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const defaultNumberOfDays = 1;
  const days = dayDifference(
    dates[0]?.endDate || new Date(new Date().getTime() + MILLISECONDS_PER_DAY * defaultNumberOfDays),
    dates[0]?.startDate || new Date()
  );

  const numberOfRooms = options?.room || 1;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = (roomId) => {
    if (user) {
      navigate(`/rooms/${id}`);
      toast.success("Chuyển đến trang đặt phòng!");
    } else {
      navigate("/login");
      toast.error("Bạn cần đăng nhập để đặt phòng.");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <ToastContainer />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Vị trí tuyệt vời – {data.distance}m đến trung tâm
            </span>
            <span className="hotelPriceHighlight">
              Đặt một kỳ nghỉ qua ${data.cheapestPrice} tại khách sạn này và nhận taxi sân bay miễn phí
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Hoàn hảo cho một {days||1}-nghỉ đêm!</h1>
                <span>
                  Nằm ngay trung tâm, chỗ nghỉ này có vị trí tuyệt vời - 9.8!
                </span>
                <p>
                  <b>${days * data.cheapestPrice * numberOfRooms||data.cheapestPrice}</b> ({days}{" "}
                  đêm)
                </p>
                <button onClick={() => handleClick(data._id)}>Đặt Ngay Bây Giờ</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Hotel;
