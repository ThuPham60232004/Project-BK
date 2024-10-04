
// Hàm để lấy màu sắc của trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case 'Xác nhận':
      return 'green';
    case 'Đang chờ':
      return 'orange';
    case 'Hủy':
      return 'red';
    default:
      return 'gray';
  }
};
export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "Người dùng",
    width: 230,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
        {params.row.username || "Chưa có tên"}
      </div>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "country",
    headerName: "Đất nước",
    width: 100,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Điện thoại",
    width: 100,
  },
  {
    field: "isAdmin",
    headerName: "Quản trị viên",
    width: 100,
    renderCell: (params) => (params.row.isAdmin ? "Có" : "Không"),
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 150,
    renderCell: (params) => {
      const date = params.row.createdAt ? new Date(params.row.createdAt) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 150,
    renderCell: (params) => {
      const date = params.row.updatedAt ? new Date(params.row.updatedAt) : new Date();
      return date.toLocaleDateString();
    },
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên",
    width: 150,
  },
  {
    field: "type",
    headerName: "Loại",
    width: 100,
  },
  {
    field: "title",
    headerName: "Tên khách sạn",
    width: 230,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 100,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 200,
  },
  {
    field: "distance",
    headerName: "Khoảng cách",
    width: 150,
  },
  {
    field: "rating",
    headerName: "Đánh giá",
    width: 100,
    renderCell: (params) => (params.row.rating ? params.row.rating.toFixed(1) : "Chưa đánh giá"),
  },
  {
    field: "cheapestPrice",
    headerName: "Giá thấp nhất",
    width: 150,
  },
  {
    field: "featured",
    headerName: "Nổi bật",
    width: 100,
    renderCell: (params) => (params.row.featured ? "Có" : "Không"),
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 200,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 100,
    renderCell: (params) => {
      const price = params.row.price ? params.row.price : 0;
      return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    },
  },
  {
    field: "discountPrice",
    headerName: "Giá giảm",
    width: 100,
    renderCell: (params) => {
      const discountPrice = params.row.discountPrice;
      return discountPrice ? discountPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "Không có";
    },
  },
  {
    field: "taxPrice",
    headerName: "Giá thuế",
    width: 100,
    renderCell: (params) => {
      const taxPrice = params.row.taxPrice;
      return taxPrice ? taxPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "Không có";
    },
  },
  {
    field: "maxPeople",
    headerName: "Tổng số người",
    width: 100,
  },
  {
    field: "category",
    headerName: "Danh mục",
    width: 100,
  },
  {
    field: "reviews",
    headerName: "Đánh giá",
    width: 200,
    renderCell: (params) => {
      const reviews = params.row.reviews || [];
      return reviews.length ? `${reviews.length} đánh giá` : "Chưa có đánh giá";
    },
  },
  {
    field: "availability",
    headerName: "Tình trạng",
    width: 150,
    renderCell: (params) => {
      const availability = params.row.availability || [];
      const bookedDates = availability.filter(item => item.isBooked).map(item => item.date);
      return bookedDates.length ? `Có ${bookedDates.length} ngày đã đặt` : "Tất cả có sẵn";
    },
  },
  {
    field: "idAdmin",
    headerName: "ID Quản trị viên",
    width: 150,
  },
];

export const bookingColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "Người dùng",
    width: 200,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          className="cellImg"
          src={params.row.user?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
          alt="avatar"
        />
        {params.row.user?.username || "Chưa có tên"}
      </div>
    ),
  },
  {
    field: "hotel",
    headerName: "Khách sạn",
    width: 200,
    renderCell: (params) => <div>{params.row.hotel?.name || "Chưa có tên"}</div>,
  },
  {
    field: "room",
    headerName: "Phòng",
    width: 230,
    renderCell: (params) => <div>{params.row.room?.title || "Chưa có tiêu đề"}</div>,
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    width: 150,
    renderCell: (params) => {
      const date = params.row.startDate ? new Date(params.row.startDate) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    width: 150,
    renderCell: (params) => {
      const date = params.row.endDate ? new Date(params.row.endDate) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 150,
    renderCell: (params) => (
      <div style={{ color: getStatusColor(params.value) }}>
        {params.value || "Chưa có trạng thái"}
      </div>
    ),
  },
  {
    field: "totalPrice",
    headerName: "Tổng giá",
    width: 150,
    renderCell: (params) => {
      const totalPrice = params.row.totalPrice ? params.row.totalPrice : 0;
      return totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    },
  },
  {
    field: "paymentMethod",
    headerName: "Phương thức thanh toán",
    width: 200,
  },
  {
    field: "checkintime",
    headerName: "Thời gian nhận phòng",
    width: 150,
    renderCell: (params) => {
      const checkintime = params.row.checkintime ? new Date(params.row.checkintime) : null;
      return checkintime ? checkintime.toLocaleDateString() : "Chưa xác định";
    },
  },
  {
    field: "idAdmin",
    headerName: "ID Admin",
    width: 150,
  },
];
// reviewColumns.js
export const reviewwwwColumns = [
  { field: "_id", headerName: "ID Đánh giá", width: 70 },
  {
    field: "userId",
    headerName: "Người dùng",
    width: 200,
    renderCell: (params) => <div>{params.row.userId || "Không có dữ liệu"}</div>,
  },
  {
    field: "hotelId",
    headerName: "Khách sạn",
    width: 200,
    renderCell: (params) => <div>{params.row.hotelId?.name || "Không có dữ liệu"}</div>,
  },
  {
    field: "roomId",
    headerName: "Phòng",
    width: 200,
    renderCell: (params) => <div>{params.row.roomId?.title || "Không có dữ liệu"}</div>,
  },
  {
    field: "rating",
    headerName: "Đánh giá",
    width: 100,
    renderCell: (params) => <div>{params.row.rating || "Chưa có đánh giá"}</div>,
  },
  {
    field: "comment",
    headerName: "Bình luận",
    width: 300,
    renderCell: (params) => <div>{params.row.comment || "Chưa có bình luận"}</div>,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 150,
    renderCell: (params) => {
      const date = params.row.createdAt ? new Date(params.row.createdAt) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 150,
    renderCell: (params) => {
      const date = params.row.updatedAt ? new Date(params.row.updatedAt) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "idAdmin",
    headerName: "ID Admin",
    width: 150,
    renderCell: (params) => <div>{params.row.idAdmin || "Không có dữ liệu"}</div>,
  },
];




export const notificationColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "Người dùng",
    width: 200,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          className="cellImg"
          src={params.row.user?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
          alt="avatar"
        />
        {params.row.user?.username || "Chưa có tên"}
      </div>
    ),
  },
  {
    field: "message",
    headerName: "Nội dung",
    width: 300,
  },
  {
    field: "isRead",
    headerName: "Đã đọc",
    width: 100,
    renderCell: (params) => (params.value ? "Có" : "Không"),
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 150,
    renderCell: (params) => {
      const date = params.row.createdAt ? new Date(params.row.createdAt) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 150,
    renderCell: (params) => {
      const date = params.row.updatedAt ? new Date(params.row.updatedAt) : new Date();
      return date.toLocaleDateString();
    },
  },
];

export const discountCodeColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "code",
    headerName: "Mã giảm giá",
    width: 200,
  },
  {
    field: "discountType",
    headerName: "Loại giảm giá",
    width: 150,
  },
  {
    field: "discountValue",
    headerName: "Giá trị giảm giá",
    width: 150,
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    width: 150,
    renderCell: (params) => {
      const date = params.row.startDate ? new Date(params.row.startDate) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "expirationDate",
    headerName: "Ngày hết hạn",
    width: 150,
    renderCell: (params) => {
      const date = params.row.expirationDate ? new Date(params.row.expirationDate) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "amountDiscountCode",
    headerName: "Số lượng",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 150,
    renderCell: (params) => {
      const date = params.row.createdAt ? new Date(params.row.createdAt) : new Date();
      return date.toLocaleDateString();
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 150,
    renderCell: (params) => {
      const date = params.row.updatedAt ? new Date(params.row.updatedAt) : new Date();
      return date.toLocaleDateString();
    },
  },
];
