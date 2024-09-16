import Sidebar from "../../../components/hotelcomponents/sidebar/Sidebar";
import Navbar from "../../../components/hotelcomponents/navbar/Navbar";
import "./home.css";
import { Link } from "react-router-dom";
import Featured from "../../../components/hotelcomponents/featured/Featured";
import Chart from "../../../components/hotelcomponents/chart/Chart";
import Table from "../../../components/hotelcomponents/table/Table";
import React from "react";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
      
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
