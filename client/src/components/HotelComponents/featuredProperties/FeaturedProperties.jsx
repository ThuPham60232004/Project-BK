import useFetch from "../../../hooks/useFetch";
import "./featuredProperties.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=4");
  const navigate = useNavigate(); 
  const handleNavigate = (id) => {
    navigate(`/hotels/${id}`);
  };

  const [activeCity, setActiveCity] = useState('Đà Nẵng');
  const cities = ["Hồ Chí Minh", "Đà Nẵng", "Vũng Tàu", "Nha Trang", "Hà Nội"];

  const handleCityClick = (city) => {
    setActiveCity(city);
  };

  return (
    <div>
      <h2>Những chỗ nghỉ nổi bật được đề xuất cho quý khách:</h2>
      <div className="cityTabs">
        {cities.map((city, index) => (
          <span
            key={index}
            className={`cityTab ${activeCity === city ? "active" : ""}`}
            onClick={() => handleCityClick(city)}
          >
            {city}
          </span>
        ))}
      </div>
      <hr className="cityDivider" />
      <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
                onClick={() => handleNavigate(item._id)}
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Bắt đầu từ ${item.cheapestPrice}</span>
             {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Tuyệt vời</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
    </div>
  );
};

export default FeaturedProperties;
