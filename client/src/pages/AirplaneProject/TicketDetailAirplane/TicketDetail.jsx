import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar1 from '../../../components/AirplaneComponent/navbarAirplane/navbarAirplane';
import './TicketDetail.css'; 

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/Tickets/getTicket/${id}`);
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        console.error('Error fetching flight ticket:', error);
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  const handleBookingClick = () => {
    navigate(`/booking/${ticket._id}`);
  };

  return (
    <div>
      <Navbar1 />
      <div className="container">
        <h1>Chi tiết vé máy bay</h1>
        <div className="ticket-detail">
          <div className="ticket-detail-image">
            {ticket.imageUrl && (
              <img src={ticket.imageUrl} alt={`Flight image ${ticket._id}`} />
            )}
          </div>
          <div className="ticket-detail-info">
            <p>{ticket.flightId?.departureCity} đến {ticket.flightId?.arrivalCity}</p>
            <p><strong>Thời gian khởi hành:</strong> {new Date(ticket.flightId?.departureTime).toLocaleString()}</p>
            <p><strong>Thời gian đến:</strong> {new Date(ticket.flightId?.arrivalTime).toLocaleString()}</p>
            <p><strong>Trạng thái vé:</strong> 
              {ticket.status === "Not booked yet" ? " Chưa đặt" : 
              ticket.status === "Booked" ? " Đã đặt" : 
              ticket.status === "Canceled" ? " Đã hủy" : 
              ticket.status}
            </p>
            <p><strong>Vị trí ghế:</strong> {ticket.seatId?.seatNumber} ({ticket.seatId?.seatClass})</p>
            <p><strong>Thời gian bay:</strong> {ticket.flightId?.duration} tiếng</p>
            <p><strong>Loại hành lý:</strong> {ticket.luggageId?.type === "inland" ? "Nội địa" : "Quốc tế"}</p>
            <p><strong>Trọng lượng hành lý xách tay:</strong> {ticket.luggageId?.weightCarryOn} kg</p>
            <p><strong>Trọng lượng hành lý ký gửi:</strong> {ticket.luggageId?.weightChecked} kg</p>
            <p><strong>Sân bay đi:</strong> {ticket.flightId?.departureCity}</p>
            <p><strong>Sân bay đến:</strong> {ticket.flightId?.arrivalCity}</p>
            <p className="pricehh"><strong>Giá vé:</strong> {ticket.price ? ticket.price.toLocaleString('vi-VN') : 'N/A'} VND</p>

          </div>
        </div>
        <div className="ticket-actions">
          <button className="action-btn" onClick={handleBookingClick}>
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
