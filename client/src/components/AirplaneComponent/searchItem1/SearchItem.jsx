import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './searchItem.css';

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <div className="siDesc">
        <h1 className="siTitle">{item.flightNumber || 'Chuyến bay không xác định'}</h1>
        <span className="siDistance">{item.departureCity || 'Nơi khởi hành'} đến {item.arrivalCity || 'Điểm đến'}</span>
        <span className="siTaxiOp">Thời gian: {item.departureTime || 'Không có'} - {item.arrivalTime || 'Không có'}</span>
        <span className="siSubtitle">
          {item.airline || 'Hãng hàng không không xác định'}
        </span>
        <span className="siFeatures">Số chỗ còn trống: {item.availableSeats !== undefined ? item.availableSeats : 'Không có'}</span>
        <span className="siCancelOp">Loại vé: {item.ticketType || 'Không xác định'} </span>
        <span className="siCancelOpSubtitle">
          {item.description || 'Không có mô tả'}
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Tuyệt vời</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.price || 'Không có giá'}</span>
          <span className="siTaxOp">Giá mỗi vé</span>
          <Link to={`/bookticketsearch/${item._id}`}>
            <button className="siCheckButton">Chọn chuyến bay</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

SearchItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    flightNumber: PropTypes.string,
    departureCity: PropTypes.string,
    arrivalCity: PropTypes.string,
    departureTime: PropTypes.string,
    arrivalTime: PropTypes.string,
    airline: PropTypes.string,
    availableSeats: PropTypes.number,
    ticketType: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};
export default SearchItem;
