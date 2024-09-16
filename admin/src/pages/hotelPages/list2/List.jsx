import "./list.css"
import Sidebar from "../../../components/hotelcomponents/sidebar/Sidebar"
import Navbar from "../../../components/hotelcomponents/navbar/Navbar"
import Datatable2 from "../../../components/hotelcomponents/datatable2/Datatable"

const List = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable2 columns={columns}/>
      </div>
    </div>
  )
}

export default List