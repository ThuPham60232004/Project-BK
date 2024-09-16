import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import { Link } from "react-router-dom";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import React from "react";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="addNewButtonContainer">
          <Link to="/hotels/new" className="addNewButton hotel">Thêm khách sạn</Link>
          <Link to="/rooms/new" className="addNewButton rooms">Thêm phòng</Link>
          <Link to="/discounts/new" className="addNewButton discounts">Thêm mã giảm giá</Link>
          <Link to="/notifications/new" className="addNewButton notifications">Thêm thông báo</Link>
          <Link to="/bookings/new" className="addNewButton bookings">Thêm đặt phòng sạn</Link>
          <Link to="/users/new" className="addNewButton users">Thêm người dùng</Link>
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Sáu tháng gần đây" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Giao Dịch Mới Nhất</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
