// src/pages/list4/List.jsx  

import "./list.css";  
import Sidebar from "../../../components/hotelcomponents/sidebar/Sidebar";  
import Navbar from "../../../components/hotelcomponents/navbar/Navbar";  
import Datatable from "../../../components/hotelcomponents/datatable/Datatable";  

const List = ({ columns }) => {  
  return (  
    <div className="list">  
      <Sidebar />  
      <div className="listContainer">  
        <Navbar />  
        <Datatable columns={columns} />  
      </div>  
    </div>  
  );  
};  

export default List;