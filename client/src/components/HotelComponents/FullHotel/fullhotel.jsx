import React, { useState } from 'react';
import useFetch from "../../../hooks/useFetch";
import "./fullhotel.css";
import { useNavigate } from "react-router-dom";

const FullHotel = () => {
  const { data, loading, error } = useFetch("http://localhost:9000/api/hotels/all");
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const handleNavigate = (id) => {
    navigate(`/hotels/${id}`);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };
  
 
  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };
  const cities = [...new Set(data.map((item) => item.city))];
  const names = [...new Set(data.map((item) => item.type))];
  const filteredHotels = data.filter((item) => {
    return (
      (selectedCity === "" || item.city === selectedCity) &&
      (selectedName === "" || item.type === selectedName) &&
      (selectedRating === "" || item.rating >= selectedRating)
    );
  });
  if (error) return <div>Lỗi tải dữ liệu</div>;

  return (
  <div className='FullHotelContainer'>
     <div className="filters">
        <select value={selectedCity} onChange={handleCityChange} className="filterSelect">
          <option value="">Tất cả thành phố</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select value={selectedName} onChange={handleNameChange} className="filterSelect">
          <option value="">Tất cả loại khách sạn</option>
          {names.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select value={selectedRating} onChange={handleRatingChange} className="filterSelect">
        <option value="5">5 sao trở lên</option>
        <option value="4">4 sao trở lên</option>
        <option value="3">3 sao trở lên</option>
        <option value="2">2 sao trở lên</option>
        <option value="1">1 sao trở lên</option>
      </select>

      </div>
        <div className="featured1">
      {loading ? (
        "Loading"
      ) : (
        <>
          {filteredHotels.map((item) => (
            <div className="featuredItem1" key={item._id} onClick={() => handleNavigate(item._id)}>
              <img
                src={item.photos[0]}
                alt={item.name}
                className="featuredImg1"
              />
              <div className="featuredTitles1">
                <p>{item.name}</p>
                <p>{item.city}</p>
                <p>Bắt đầu từ ${item.cheapestPrice}</p>
                {item.rating && (
                  <div className="fpRating1">
                    <button>{item.rating}</button>
                    <span>Tuyệt vời</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
</div>
  );
};

export default FullHotel;
