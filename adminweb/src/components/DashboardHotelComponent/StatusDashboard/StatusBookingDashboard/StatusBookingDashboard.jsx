import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import './StatusBookingDashboard.css';

Modal.setAppElement('#root'); 

const StatusBookingDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [selectedHotelId, setSelectedHotelId] = useState('');
  const storedIdAdmin = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/hotels/hotelAdmin/${storedIdAdmin}`);
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, [storedIdAdmin]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (selectedHotelId) {
        try {
          const response = await fetch(`http://localhost:9000/api/bookings/getbyhotel/${selectedHotelId}`);
          const data = await response.json();
          setBookingData(data);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      }
    };

    fetchBookings();
  }, [selectedHotelId]);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleStatusChange = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/bookings/${selectedBooking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        const updatedBooking = await response.json();
        setBookingData((prevData) =>
          prevData.map((booking) =>
            booking._id === updatedBooking._id ? updatedBooking : booking
          )
        );
        closeModal(); 
      } else {
        console.error("Error updating booking status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderSeat = (booking) => {
    let className = 'seat';

    if (booking.status === 'pending') className += ' pending';
    else if (booking.status === 'confirmed') className += ' confirmed';
    else if (booking.status === 'cancelled') className += ' cancelled';

    return (       
      <div style={{width:'100%',display:'flex',gap:'20px',justifyContent:'center'}}>
        <div style={{width:'85%',display:'flex', height:'auto',flexDirection:'column', border:'none',margin:'0',padding:'10px',marginTop:'10px'}} className={className} key={booking._id} onClick={() => openModal(booking)}>
          <p style={{display:'flex',justifyContent:'space-between',margin:'0',padding:'5px 20px',color:'gray',fontSize:'18px',fontWeight:'500',background:'white',borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}>Tên KS <strong style={{margin:'0',padding:'0',color:'black'}}>{booking.hotel}</strong></p>
          <p style={{display:'flex',justifyContent:'space-between',margin:'0',padding:'5px 20px',color:'gray',fontSize:'18px',fontWeight:'500',background:'white'}}>Tên người dùng <strong style={{margin:'0',padding:'0',color:'black'}}>{booking.user}</strong></p>
          <p style={{display:'flex',justifyContent:'space-between',margin:'0',padding:'5px 20px',color:'gray',fontSize:'18px',fontWeight:'500',background:'white'}}>Tên phòng <strong style={{margin:'0',padding:'0',color:'black'}}>{booking.room}</strong></p>
          <p style={{display:'flex',justifyContent:'space-between',margin:'0',padding:'5px 20px',color:'gray',fontSize:'18px',fontWeight:'500',background:'white',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>Trạng thái <strong style={{margin:'0',padding:'0',color:'black'}}>{booking.status}</strong></p>
        </div>
      </div>
      
    );
  };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px'}} className="seat-map">
      <div style={{width:'100%',display:'flex',gap:'15px',alignItems:'center',padding:'20px'}}>
         <h2 style={{width:'70%',borderBottom:'none',margin:'0',padding:'0',fontWeight:800}}>Chọn khách sạn để xem trạng thái đặt phòng</h2>
      <select style={{width:'30%',padding:'10px 20px',borderRadius:'10px'}} onChange={(e) => setSelectedHotelId(e.target.value)} value={selectedHotelId}>
        <option value="">Chọn khách sạn</option>
        {hotels.map(hotel => (
          <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
        ))}
      </select>
      </div>
     

      {bookingData.map(booking => renderSeat(booking))}

      {selectedBooking && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Booking Details"
          className="booking-modal"
          overlayClassName="booking-modal-overlay"
        >
          <h2 style={{fontSize:'20px',fontWeight:'800'}}>Cập nhật trạng thái đơn đặt phòng</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'15px'}}>
            <div style={{padding:'20px',display:'flex',flexDirection:'column',gap:'10px', border:'1px solid gray', borderRadius:'10px'}}>
              <div style={{fontWeight:'800',fontSize:'16px'}}><strong style={{fontWeight:'600'}}>Tên khách sạn :</strong> {selectedBooking.hotel}</div>
              <div style={{fontWeight:'800',fontSize:'16px'}}><strong style={{fontWeight:'600'}}>Tên người dùng :</strong> {selectedBooking.user}</div>
              <div style={{fontWeight:'800',fontSize:'16px'}}><strong style={{fontWeight:'600'}}>Tên phòng :</strong> {selectedBooking.room}</div>
              <div style={{display:'flex',gap:'10px', alignItems:'center'}}>
                <label htmlFor="status"><strong style={{fontWeight:'600',margin:'0',padding:'0'}}>Trạng thái đơn đặt phòng:</strong></label>
                <select style={{padding:'5px 10px', margin:'0',background:'gray',border:'none',outline:'none', borderRadius:'5px',color:'white',fontWeight:'700'}}
                  id="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
          <div style={{width:'100%',display:'flex',gap:'10px'}}>
          <button style={{width:'50%',padding:'10px',borderRadius:'10px',border:'none',background:'green',color:'white',fontWeight:'700',fontSize:'16px'}} className='btnhh' onClick={handleStatusChange}>Cập nhật trạng thái</button>
          <button style={{width:'50%',padding:'10px',borderRadius:'10px',border:'none',background:'red',color:'white',fontWeight:'700',fontSize:'16px'}} className='bthhh' onClick={closeModal}>Đóng</button>
          </div>
         
          </div>
          
        </Modal>
      )}
    </div>
  );
};

export default StatusBookingDashboard;
