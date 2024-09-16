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

// Định nghĩa component List
const List = () => {
  // Lấy thông tin từ location state
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // Fetch dữ liệu khách sạn dựa trên các tiêu chí tìm kiếm
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:9000/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleClick = () => {
    try {
      reFetch();
      toast.success("Tìm kiếm thành công!");
    } catch (err) {
      toast.error("Lỗi khi tìm kiếm!");
    }
  };

  // Hiển thị thông báo lỗi nếu có
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
              <input placeholder={destination} type="text" />
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
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá tối đa <small>mỗi đêm </small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Người Lớn</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Trẻ em</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Phòng</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Tìm kiếm</button>
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
