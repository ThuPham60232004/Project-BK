import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import "./datatable.css";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    if (Array.isArray(data)) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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
