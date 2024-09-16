import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { bookingColumns } from "../../../datatablesource";
import "./table.css";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/bookings"); // Adjust the API endpoint as needed
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="booking">
      <div className="bookingTitle">Danh Sách Đặt Phòng</div>
      <DataGrid
        rows={bookings}
        columns={bookingColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Booking;
