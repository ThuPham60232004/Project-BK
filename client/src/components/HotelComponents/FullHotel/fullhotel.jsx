import React from 'react';
import useFetch from "../../../hooks/useFetch";
import "./fullhotel.css";
import { useNavigate } from "react-router-dom";

const FullHotel = () => {
  const { data, loading, error } = useFetch("http://localhost:9000/api/hotels/all");
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/hotels/${id}`);
  };

  if (error) return <div>Lỗi tải dữ liệu</div>;

  return (
    <div className="featured1">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
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
  );
};

export default FullHotel;