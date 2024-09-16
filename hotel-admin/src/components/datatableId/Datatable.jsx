import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import "./datatable.css";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [role, setRole] = useState(null);
  const [idAdmin, setIdAdmin] = useState(null);
  const [fetchUrl, setFetchUrl] = useState(null);

  // Fetch role and idAdmin from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedIdAdmin = localStorage.getItem("userId");
    setRole(storedRole);
    setIdAdmin(storedIdAdmin);
    console.log("Stored Role:", storedRole);
    console.log("Stored ID Admin:", storedIdAdmin);

    // Construct fetch URL based on role and idAdmin
    if (storedRole === 'hotel_admin' && storedIdAdmin) {
      setFetchUrl(`/${path}/hotelAdmin/${storedIdAdmin}`);
    }
  }, [path]);

  // Use useFetch hook only if fetchUrl is set
  const { data, loading, error } = useFetch(fetchUrl);

  // Debugging: Check fetchUrl and response data
  useEffect(() => {
    console.log("Fetch URL:", fetchUrl);
    console.log("Fetched Data:", data);
  }, [fetchUrl, data]);

  // Update list when data changes
  useEffect(() => {
    if (Array.isArray(data)) {
      setList(data);
    } else {
      console.warn("Data is not an array:", data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const handleRowClick = (params) => {
    navigate(`/${path}/${params.row._id}`);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Chọn",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/${path}/test`} style={{ textDecoration: "none" }}>
            <div className="viewButton">Xem tất cả</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Xóa</div>
        </div>
      ),
    },
  ];

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Bạn không có quyền truy cập, hoặc dữ liệu đang bị lỗi</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">Thêm mới</Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default Datatable;
