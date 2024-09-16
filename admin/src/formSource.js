export const userInputs = [
  {
    id: "username",
    label: "Người dùng",
    type: "text",
    placeholder: "Phạm Thị Anh Thư",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "phamthianhthu6023789@gmail.com",
  },
  {
    id: "phone",
    label: "Số điện thoại",
    type: "text",
    placeholder: "+84 868322170",
  },
  {
    id: "password",
    label: "Mật khẩu",
    type: "password",
  },
  {
    id: "country",
    label: "Quốc gia",
    type: "text",
    placeholder: "Việt Nam",
  },
  {
    id: "city",
    label: "Thành phố",
    type: "text",
    placeholder: "TP HCM",
  },
  {
    id: "CCCD",
    label: "CCCD",
    type: "text",
    placeholder: "Nhập số CCCD",
  },
  {
    id: "isAdmin",
    label: "Quyền admin",
    type: "checkbox",
  },
  {
    id: "role",
    label: "Vai trò",
    type: "select",
    options: [
      { value: "system_admin", label: "System Admin" },
      { value: "hotel_admin", label: "Hotel Admin" },
      { value: "user", label: "User" },
    ],
  },
];
const userId = localStorage.getItem('userId'); // Replace 'userId' with the actual key if it's different

export const hotelInputs = [
  {
    id: "name",
    label: "Tên khách sạn",
    type: "text",
    placeholder: "Khách sạn Khánh Hoà",
  },
  {
    id: "type",
    label: "Loại khách sạn",
    type: "text",
    placeholder: "Khách sạn 4 sao",
  },
  {
    id: "city",
    label: "Thành phố",
    type: "text",
    placeholder: "TP HCM",
  },
  {
    id: "address",
    label: "Địa chỉ",
    type: "text",
    placeholder: "Bến Thành, Q1, TPHCM",
  },
  {
    id: "distance",
    label: "Khoảng cách đến thành phố",
    type: "text",
    placeholder: "500 km",
  },
  {
    id: "title",
    label: "Tiêu đề",
    type: "text",
    placeholder: "Top khách sạn tốt nhất",
  },
  {
    id: "desc",
    label: "Mô tả",
    type: "text",
    placeholder: "Mô tả về khách sạn",
  },
  {
    id: "cheapestPrice",
    label: "Giá rẻ nhất",
    type: "number",
    placeholder: "100",
  },
  {
    id: "idAdmin",
    label: "ID Admin",
    type: "text",
    value: userId || "Nhập ID Admin", 
    readOnly: true,  
    placeholder: userId || "Nhập ID Admin", 
  },
];

export const roomInputs = [
  {
    id: "title",
    label: "Tên phòng",
    type: "text",
    placeholder: "Phòng VIP",
  },
  {
    id: "desc",
    label: "Mô tả",
    type: "text",
    placeholder: "Giường cỡ lớn nhất, một phòng tắm",
  },
  {
    id: "price",
    label: "Giá",
    type: "number",
    placeholder: "100",
  },
  {
    id: "discountPrice",
    label: "Giá giảm",
    type: "number",
    placeholder: "Nhập giá giảm (nếu có)",
  },
  {
    id: "taxPrice",
    label: "Giá thuế",
    type: "number",
    placeholder: "Nhập giá thuế (nếu có)",
  },
  {
    id: "maxPeople",
    label: "Số người tối đa",
    type: "number",
    placeholder: "2",
  },
  {
    id: "category",
    label: "Loại phòng",
    type: "select",
    options: [
      { value: "Phòng Hạng Sang", label: "Phòng Hạng Sang" },
      { value: "Phòng Tổng Thống", label: "Phòng Tổng Thống" },
      { value: "Phòng Thường", label: "Phòng Thường" },
    ],
  },
  {
    id: "availability",
    label: "Tình trạng phòng",
    type: "text",
    placeholder: "Ngày và trạng thái phòng",
  },
  {
    id: "idAdmin",
    label: "ID Admin",
    type: "text",
    value: userId || "Nhập ID Admin", 
    readOnly: true,  
    placeholder: userId || "Nhập ID Admin", 
  },
];
export const bookingInputs = [
  {
    id: "user",
    label: "User ID",
    type: "text",
    placeholder: "Nhập ID người dùng",
  },
  {
    id: "hotel",
    label: "Hotel ID",
    type: "text",
    placeholder: "Nhập ID khách sạn",
  },
  {
    id: "room",
    label: "Room ID",
    type: "text",
    placeholder: "Nhập ID phòng",
  },
  {
    id: "startDate",
    label: "Ngày bắt đầu",
    type: "date",
  },
  {
    id: "endDate",
    label: "Ngày kết thúc",
    type: "date",
  },
  {
    id: "status",
    label: "Trạng thái",
    type: "select",
    options: [
      { value: "pending", label: "Đang chờ" },
      { value: "confirmed", label: "Đã xác nhận" },
      { value: "cancelled", label: "Đã hủy" },
    ],
  },
  {
    id: "totalPrice",
    label: "Tổng giá",
    type: "number",
    placeholder: "Nhập tổng giá",
  },
  {
    id: "paymentMethod",
    label: "Phương thức thanh toán",
    type: "select",
    options: [
      { value: "vnpay", label: "VNPay" },
      { value: "moca", label: "Moca" },
      { value: "webmoney", label: "WebMoney" },
      { value: "paypal", label: "PayPal" },
      { value: "Mastercard", label: "MasterCard" },
      { value: "Visa", label: "Visa" },
    ],
  },
  {
    id: "checkintime",
    label: "Thời gian nhận phòng",
    type: "datetime-local",
  },
  {
    id: "idAdmin",
    label: "ID Admin",
    type: "text",
    value: userId || "Nhập ID Admin", 
    readOnly: true,  
    placeholder: userId || "Nhập ID Admin", 
  },
];
export const reviewInputs = [
  {
    id: "userId",
    label: "User ID",
    type: "text",
    placeholder: "Nhập ID người dùng",
  },
  {
    id: "hotelId",
    label: "Hotel ID",
    type: "text",
    placeholder: "Nhập ID khách sạn",
  },
  {
    id: "roomId",
    label: "Room ID",
    type: "text",
    placeholder: "Nhập ID phòng",
  },
  {
    id: "rating",
    label: "Đánh giá",
    type: "number",
    placeholder: "Nhập đánh giá (từ 0 đến 5)",
    min: 0,
    max: 5,
  },
  {
    id: "comment",
    label: "Bình luận",
    type: "text",
    placeholder: "Nhập bình luận",
  },
  {
    id: "idAdmin",
    label: "ID Admin",
    type: "text",
    value: userId || "Nhập ID Admin", 
    readOnly: true,  
    placeholder: userId || "Nhập ID Admin", 
  },
];
export const notificationInputs = [
  {
    id: "user",
    label: "User ID",
    type: "text",
    placeholder: "Nhập ID người dùng",
  },
  {
    id: "message",
    label: "Nội dung",
    type: "text",
    placeholder: "Nhập nội dung thông báo",
  },
  {
    id: "idAdmin",
    label: "ID Admin",
    type: "text",
    value: userId || "Nhập ID Admin", 
    readOnly: true,  
    placeholder: userId || "Nhập ID Admin", 
  },
];
export const discountcodeInputs = [
  {
    id: "code",
    label: "Mã giảm giá",
    type: "text",
    placeholder: "Nhập mã giảm giá",
  },
  {
    id: "discountType",
    label: "Loại giảm giá",
    type: "select",
    options: [
      { value: "percentage", label: "Phần trăm (%)" },
      { value: "fixed", label: "Cố định" },
    ],
  },
  {
    id: "discountValue",
    label: "Giá trị giảm giá",
    type: "number",
    placeholder: "Nhập giá trị giảm giá",
  },
  {
    id: "startDate",
    label: "Ngày bắt đầu",
    type: "date",
  },
  {
    id: "endDate",
    label: "Ngày kết thúc",
    type: "date",
  },
  {
    id: "idAdmin",
    label: "ID Admin",
    type: "text",
    value: userId || "Nhập ID Admin", 
    readOnly: true,  
    placeholder: userId || "Nhập ID Admin", 
  },
];
