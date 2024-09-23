import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import "./HotelTypeList.css";
import { Link } from "react-router-dom";
const HotelTypeList = () => {
  const { type } = useParams();
  const { data, loading } = useFetch(`http://localhost:9000/api/hotels/getHotelsByType?type=${type}`);

  return (
    <div className="hotelTypeList">
      <h2>Danh sách các {type}</h2>
      {loading ? (
        "Đang tải..."
      ) : (
        <div className="hotelList">
          {data.map((hotel) => (
            <div className="hotelItem" key={hotel._id}>
              <img src={hotel.photos[0]} alt="" className="siImg" />
              <div className="siDesc">
                <h1 className="siTitle">{hotel.name}</h1>
                <span className="siDistance">{hotel.distance}m từ trung tâm</span>
                <span className="siSubtitle">{hotel.title}</span>
                <span className="siFeatures">{hotel.desc}</span>
                <span className="siCancelOp">Free cancellation</span>
                <span className="siCancelOpSubtitle">
                  Bạn có thể hủy sau, hãy chốt mức giá tuyệt vời ngay hôm nay!
                </span>
              </div>
              <div className="siDetails">
                {hotel.rating && (
                  <div className="siRating">
                    <span>Tuyệt vời</span>
                    <button>{hotel.rating}</button>
                  </div>
                )}
                <div className="siDetailTexts">
                  <span className="siPrice">{hotel.cheapestPrice}VNĐ</span>
                  <span className="siTaxOp">Bao gồm thuế và phí</span>
                  <Link to={`/hotels/${hotel._id}`}>
                    <button className="siCheckButton">Xem phòng trống</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelTypeList;
