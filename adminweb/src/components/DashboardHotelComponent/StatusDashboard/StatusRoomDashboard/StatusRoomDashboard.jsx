import React, { useState, useEffect } from "react";
import axios from "axios";
import './StatusRoomDashboard.css';

const StatusRoomDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomStatus, setRoomStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const storedIdAdmin = localStorage.getItem("userId");
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/hotels/hotelAdmin/${storedIdAdmin}`);
        setHotels(res.data); 
      } catch (err) {
        console.error("Error fetching hotels:", err);
      }
    };

    fetchHotels();
  }, []);

  const fetchRoomStatus = async (hotelId) => {
    try {
      const res = await axios.get(`http://localhost:9000/api/hotels/room/${hotelId}`);
      setRoomStatus(res.data);  
    } catch (err) {
      console.error("Error fetching room status:", err);
    }
  };

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    fetchRoomStatus(hotel._id); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRoomStatus([]);
  };

  const toggleRoomAvailability = (roomId) => {
    setRoomStatus((prevRoomStatus) =>
      prevRoomStatus.map((room) =>
        room._id === roomId ? { ...room, availability: !room.availability } : room
      )
    );
  };

  return (
    <div className="hotels-container">
      <h2>Danh sách khách sạn</h2>
      <div className="hotel-list">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div 
              key={hotel._id} 
              className="hotel-item" 
              onClick={() => handleHotelClick(hotel)}
            >
              <img 
                src={hotel.photos && hotel.photos.length > 0 ? hotel.photos[0] : 'default-image.jpg'}  // Use first image or fallback
                alt={hotel.name} 
                className="hotel-image" 
              />
              <h3>{hotel.name}</h3>
            </div>
          ))
        ) : (
          <p>Đang tải danh sách khách sạn...</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal" style={{ display: isModalOpen ? "flex" : "none" }}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Phòng của khách sạn: {selectedHotel.name}</h2>
            <div className="status-map">
              {roomStatus.length > 0 ? (
                roomStatus.map(room => (
                  <div 
                    key={room._id} 
                    className={`status ${room.availability ? 'available' : 'unavailable'}`}
                    onClick={() => toggleRoomAvailability(room._id)} 
                  >
                    {room.title}
                  </div>
                ))
              ) : (
                <p>Đang tải trạng thái phòng...</p>
              )}
            </div>
            <div className="legend">
              <div><span className="available-status"></span> Phòng trống</div>
              <div><span className="unavailable-status"></span> Phòng đã đặt</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusRoomDashboard;
