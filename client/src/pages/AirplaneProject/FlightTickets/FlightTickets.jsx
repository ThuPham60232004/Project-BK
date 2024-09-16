import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FlightTickets.css'; // Import file CSS
import Navbar1 from "../../../components/AirplaneComponent/navbarAirplane/navbarAirplane";
import Header1 from "../../../components/AirplaneComponent/header1/Header1";
import MailList from "../../../components/mailList/MailList";
import Footer from "../../../components/AirplaneComponent/footer/Footer";
import BookingModal from '../../../components/AirplaneComponent/BookingModal/BookingModal'; // Import BookingModal

const FlightTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/Tickets/getTickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching flight tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleBookingClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div>
      <Navbar1 />
      <Header1 />
      <div className="container">
        <h1>Vé máy bay</h1>
        <div className="ticket-list">
          {tickets.map(ticket => (
            <div key={ticket._id} className="ticket-card">
              <div className="ticket-info">
                <div className="time-info">
                  <p><strong>Trạng thái vé:</strong> 
                    {ticket.status === "Not booked yet" ? " Chưa đặt" : 
                    ticket.status === "Booked" ? " Đã đặt" : 
                    ticket.status === "Canceled" ? " Đã hủy" : 
                    ticket.status}
                  </p>
                  <p><strong>Thời gian khởi hành:</strong> {new Date(ticket.flightId?.departureTime).toLocaleTimeString()}</p>
                  <p><strong>Thời gian đến:</strong> {new Date(ticket.flightId?.arrivalTime).toLocaleTimeString()}</p>
                  <p><strong>Vị trí ghế:</strong> {ticket.seatId?.seatNumber} ({ticket.seatId?.seatClass})</p>
                  <p><strong>Thời gian bay:</strong> {ticket.flightId?.duration} tiếng</p>
                  <p><strong>Loại hành lý:</strong> {ticket.luggageId?.type === "inland" ? "Nội địa" : "Quốc tế"}</p>
                  <p><strong>Trọng lượng hành lý xách tay:</strong> {ticket.luggageId?.weightCarryOn} kg</p>
                  <p><strong>Trọng lượng hành lý ký gửi:</strong> {ticket.luggageId?.weightChecked} kg</p>
                </div>
                <div className="airport-info">
                  <p><strong>Sân bay đi:</strong> {ticket.flightId?.departureCity}</p>
                  <p><strong>Sân bay đến:</strong> {ticket.flightId?.arrivalCity}</p>
                </div>
              </div>
                     
              <div className="ticket-pricing">
                <div className="pricing-box economy">
                  <p className="class-title">
                    <button className="class-title_button" onClick={() => 
                      handleBookingClick(ticket)}>
                        Đặt Ngay</button></p>
                  <p className="pricehh">{ticket.price ? ticket.price.toLocaleString('vi-VN') : 'N/A'} VND</p>
                </div>
                <div className="pricing-box business">
                  <p className="class-title">Xem Chi Tiết</p>
                  <Link to={`/Tickets/getTicket/${ticket._id}`}>
                    <p className="price">Bấm vào ngay</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MailList />
      <Footer />

      {isModalOpen && selectedTicket && (
        <BookingModal 
          ticket={selectedTicket} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default FlightTickets;
