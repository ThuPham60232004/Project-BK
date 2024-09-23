import React, { useState, useContext, useEffect } from "react";
import {faHotel,faCalendarDays,faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";
import { AuthContext } from "../../../context/AuthContext";
const cities = [
  { name: "Miami"},
  { name: "New York"},
  { name: "TPHCM"},
  { name: "London"},
  { name: "Berlin"},
  { name: "Aspen"},
  { name: "Paris"},
  { name: "Los Angeles"},
  { name: "Bangkok"},
  { name: "Sydnay"},
  { name: "Zurich"},
  
];
const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  useEffect(() => {
    const bannerCount = banners.length;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerCount);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilteredCities(
      cities.filter(city =>
        city.name.toLowerCase().includes(destination.toLowerCase())
      )
    );
  }, [destination]);

  const handleSuggestionClick = (cityName) => {
    setDestination(cityName);
    setShowSuggestions(false);
  };
  const banners = [
    "https://toquoc.mediacdn.vn/2019/2/12/logo-524159843481660624526793169598440388689920n-15499690804651619107597.jpg",
    "https://images2.thanhnien.vn/528068263637045248/2023/9/11/biden-1-16944073932181767618117.jpg",
    "https://vcdn1-dulich.vnecdn.net/2019/02/06/Hanoi-Daewoo-Hotel-VnExpress-1549445002.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=CG2FtIEfrv-zqiu3ZDYhow",
    "https://ktmt.vnmediacdn.com/images/2023/09/11/81-1694409922-jw-3-1.jpg",
    "https://media.truyenhinhdulich.vn/upload/news/2857_nhung_khach_san_donald_trump_tung_o_khi_cong_du_ch.jpg",
    "https://images2.thanhnien.vn/528068263637045248/2023/9/12/the-reverie-2-1694491501124271243870.jpg",
    "https://phunuvietnam.mediacdn.vn/179072216278405120/2023/9/9/9-kham-pha-ben-trong-nhung-khach-san-dang-cap-tiep-don-nhung-nguyen-thu-the-gioi-khi-den-viet-nam-16942599023801913649486.jpg",
    "https://cafefcdn.com/2019/9/17/photo-1-15687067343281791945164.jpg",
    "https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/29093056/image-kham-pha-phong-khach-san-sang-trong-noi-tong-thong-my-duong-nhiem-tung-o-164849585523299.jpg",
    "https://cdn-i.vtcnews.vn/files/nguyenyen/2019/02/23/2-1525415.jpg",
    "https://phunuvietnam.mediacdn.vn/179072216278405120/2023/9/9/5-kham-pha-ben-trong-nhung-khach-san-dang-cap-tiep-don-nhung-nguyen-thu-the-gioi-khi-den-viet-nam-16942599023011962211779.jpg",
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
                      <h1>{`Khách sạn 6 sao`}</h1>
                      <p>{`Khám phá dàn khách sạn 6 sao dành cho tổng thống `}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faHotel} className="headerIcon" />
                <input
              type="text"
              placeholder="Bạn muốn đi đâu?"
              className="headerSearchInput"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowSuggestions(true);
              }}
            />
            {showSuggestions && (
              <ul className="suggestions">
                {filteredCities.map((city, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(city.name)}>
                    {city.name} 
                  </li>
                ))}
              </ul>
            )}

              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
                  {`${options.adult} Người lớn · ${options.children} Trẻ em · ${options.room} Số lượng phòng`}
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
                      <span className="optionText">Trẻ em</span>
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
                    <div className="optionItem">
                      <span className="optionText">Số lượng phòng </span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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

export default Header;
