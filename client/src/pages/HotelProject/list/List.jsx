import "./list.css";
import Navbar from "../../../components/HotelComponents/navbar/Navbar";
import Header from "../../../components/HotelComponents/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../../components/HotelComponents/searchItem/SearchItem";
import useFetch from "../../../hooks/useFetch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  
  const cities = [
    { name: "Miami" },
    { name: "New York" },
    { name: "TPHCM" },
    { name: "London" },
    { name: "Berlin" },
    { name: "Aspen" },
    { name: "Paris" },
    { name: "Los Angeles" },
    { name: "Bangkok" },
    { name: "Sydney" }, 
    { name: "Zurich" },
    { name: "San Francisco" },
    { name: "Las Vegas" },
  ];

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:9000/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  if (error) {
    toast.error("Lỗi khi lấy dữ liệu: " + error.message);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <ToastContainer />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Tìm Kiếm</h1>
            <div className="lsItem">
              <label>Mô tả</label>
              <select 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                className="lsOptionInput4"
              >
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="lsItem">
              <label>Ngày Nhận Phòng</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "MM/dd/yyyy")} đến ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Lựa Chọn</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá tối thiểu <small>mỗi đêm </small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    value={min}
                    className="lsOptionInput"
                    min={0} 
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá tối đa <small>mỗi đêm </small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    value={max}
                    className="lsOptionInput"
                    min={0} 
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Người Lớn</span>
                  <input
                    type="number"
                    min={1}
                    value={options.adult}
                    onChange={(e) => setOptions({ ...options, adult: Math.max(1, e.target.value) })}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Trẻ em</span>
                  <input
                    type="number"
                    min={0}
                    value={options.children}
                    onChange={(e) => setOptions({ ...options, children: Math.max(0, e.target.value) })}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Phòng</span>
                  <input
                    type="number"
                    min={1}
                    value={options.room}
                    onChange={(e) => setOptions({ ...options, room: Math.max(1, e.target.value) })}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
