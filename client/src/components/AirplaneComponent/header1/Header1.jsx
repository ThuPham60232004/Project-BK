import {
  faCalendarDays,
  faPerson,
  faTaxi,
  faPlaneArrival,
  faPlaneDeparture,
  faHotel,
  faCartShopping,
  faStar,
  faCheckToSlot,
  faHomeUser,
  faFighterJet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header1.css";
import { DateRange } from "react-date-range";
import { useContext, useState,useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; 
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext1 } from "../../../context/SearchContext1";
import { AuthContext } from "../../../context/AuthContext";

const Header1 = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
  });
  const [tripType, setTripType] = useState("roundtrip");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext1);

  const handleSearch = () => {
  };

  const handleDateChange = (item) => {
    setDates([item.selection]);
    if (tripType === "oneway") {
      setDates([
        {
          startDate: item.selection.startDate,
          endDate: item.selection.startDate,
          key: "selection",
        },
      ]);
    }
  };
  useEffect(() => {
    const bannerCount = banners.length;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerCount);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);
  const banners = [
    "https://nhatkybay.club/wp-content/uploads/2020/07/Nh%E1%BB%AFng-b%E1%BB%99-%C4%91%E1%BB%93ng-ph%E1%BB%A5c-ti%E1%BA%BFp-vi%C3%AAn-h%C3%A0ng-kh%C3%B4ng-%C4%91%E1%BA%B9p-nh%E1%BA%A5t-th%E1%BA%BF-gi%E1%BB%9Bi-10.jpg",
    "https://giadinh.mediacdn.vn/296230595582509056/2023/3/21/tiep-vien-hang-khong-1-16793785242851038390616.jpg",
    "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/8311-1608458990497.jpg",
    "https://owa.bestprice.vn/images/articles/uploads/cac-hang-may-bay-hang-hang-khong-cua-viet-nam-5f7583b6b6787.jpg",
    "https://pantravel.vn/wp-content/uploads/2024/02/eva-air.jpg",
    "https://pantravel.vn/wp-content/uploads/2024/02/may-bay-emirates.jpg",
    "https://dongphucsaoviet.vn/hoanghung/0/images/nhung-mau-dong-phuc-tiep-vien-hang-khong-tren-the-gioi-06.jpg",
    "https://thanhnien.mediacdn.vn/uploaded/dieutrang.qc/2018_08_22/vna/vnatrainingtour_zing-16_OTVC.jpg?width=500",
    "https://nld.mediacdn.vn/291774122806476800/2023/8/25/hug03688-16929388712281916053923.jpg",
    "https://www.tapchihangkhong.com/wp-content/uploads/2017/08/Autism-Sky_0-1024x682.jpg",
    "https://static-images.vnncdn.net/files/publish/2024/2/17/may-bay-boeing-787-cho-200-khach-quay-dau-ha-canh-vi-hong-8-trong-so-9-toilet-196.jpg?width=0&s=tO8Hxt2b4SzA2vW3b-sd3A",
  ];

  return (
    <div className="header">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
          {type !== "list" && (
            <>
              <div className="headerBanner">
                <div className="bannerTrack" style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}>
                  {banners.map((banner, index) => (
                    <div key={index} className="bannerItem">
                      <img src={banner} alt={`Banner ${index + 1}`} />
                      <div className="bannerTitle">
                      <h1>{`Các chuyến bay chất lượng`}</h1>
                      <p>{`Khám phá phá cảnh quan thế giới cùng chúng tôi và gia đình của bạn `}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Điểm khởi hành"
                  className="headerSearchInput"
                  onChange={(e) => setDepartureCity(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Điểm đến"
                  className="headerSearchInput"
                  onChange={(e) => setArrivalCity(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} đến ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
                  {`${options.adult} Người lớn · ${options.children} Trẻ con `}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Người lớn</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Trẻ con</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

           

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCheckToSlot} className="headerIcon" />
                <select
                  className="headerSearchInput"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <option value="roundtrip">Khứ hồi</option>
                  <option value="oneway">Một chiều</option>
                </select>
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header1;
