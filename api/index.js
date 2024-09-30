//yarn add bcryptjs: dùng để mã hoá mật khẩu 
// yarn add express: dùng để thêm framwork
//yarn add dontenv: dùng những file đuôi .env
//yarn add mongoose: dùng để kết nối cơ sở dữ liệu với MONGODB
// yarn add jsonwebtoken: dùng để tạo và xác minh
//openssl rand -base64 32: được sử dụng để tạo ra một chuỗi ngẫu nhiên có độ dài là 32 byte, sau đó mã hóa chuỗi đó thành dạng mã hóa base64.
//yarn add cookie-parser: là một lệnh sử dụng để cài đặt (install) một middleware, sử dụng để phân tích và xử lý cookie trong yêu cầu HTT
//yarn add Axios: là một thư viện HTTP client dùng để thực hiện các yêu cầu HTTP
//yarn add  --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/fontawesome-svg-core

//yarn add chartjs-adapter-date-fns
//yarn add @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
// yarn add node-cron   
//Một số trạng thái của HTTP 
//req: gửi yêu cầu
//res: trả lại yêu cầu
//Middleware trong Express là một hàm có thể trung gian (intermediate function) được sử dụng để xử lý yêu cầu HTTP
//next là một hàm được sử dụng để chuyển điều khiển sang middleware hoặc hàm xử lý yêu cầu tiếp theo trong chuỗi xử lý.
//200: OK - Mọi thứ đã diễn ra thành công.
//404: Not Found - Không tìm thấy tài nguyên yêu cầu.
//500: Internal Server Error - Lỗi máy chủ nội bộ.
//react-toastif: để hỗ trợ thông báo
//jsonwebtoken là một thư viện được sử dụng để tạo và xác minh (JWT). JWT là một chuẩn mở được sử dụng để giao tiếp giữa các bên trong một ứng dụng phân tán một cách an toàn và bảo mật.
//yarn add lodash socket.io-client antd
//yarn add socket.io
//yarn add react-chartjs-2 chart.dd
//yarn add moment
//------------------------
import usersRoute from "./routes/users.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import notifications from "./routes/notification.js";

//--------------------------------------------------------------------------------------
//import hotel
import hotelsRoute from "./routes/hotels/hotels.js";
import roomsRoute from "./routes/hotels/rooms.js";
import bookingRoute from "./routes/hotels/booking.js";
import reviews from "./routes/hotels/reviews.js";
import discount from "./routes/hotels/discountRoutes.js"
import './jobs/updateRoomAvailability.js';
//----------------------------------------------------------------------------------------
//import flight
import Airline from "./routes/airlines/Airlines.js"
import Airplanes from "./routes/airlines/Airplanes.js";
import BookingTicket from "./routes/airlines/BookingTicket.js";
import DiscountCodesAirplane from "./routes/airlines/DiscountCodesAirplane.js";
import Flights from "./routes/airlines/Flights.js";
import Luggage from "./routes/airlines/Luggage.js";
import LuggageFee from "./routes/airlines/LuggageFee.js"
import Meals from "./routes/airlines/Meals.js";
import Seats from "./routes/airlines/Seats.js";
import Tickets from "./routes/airlines/Tickets.js";
const app = express();
dotenv.config();
//----------------------------------------------------------------------------------------
// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
//----------------------------------------------------------------------------------------
// Routes hotel
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/notifications", notifications);
app.use("/api/reviews", reviews);
app.use("/api/discounts", discount);
//Routes flight
app.use("/api/Airline", Airline);
app.use("/api/Airplanes", Airplanes);
app.use("/api/BookingTicket",BookingTicket);
app.use("/api/DiscountCodesAirplane",DiscountCodesAirplane);
app.use("/api/Flights",Flights);
app.use("/api/Luggage",Luggage);
app.use("/api/LuggageFee",LuggageFee);
app.use("/api/Meals",Meals);
app.use("/api/Seats",Seats);
app.use("/api/Tickets",Tickets);
//----------


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Đã xảy ra lỗi!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
//----------------------------------------------------------------------------------------
// Kết nối mongo
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối với MongoDB thành công");
  } catch (error) {
    console.error("Không thể kết nối đến MongoDB:", error.message);
    throw error;
  }
};
mongoose.connection.on("error", () => {
  console.log("Không thể kết nối đến MongoDB");
});

//----------------------------------------------------------------------------------------
//test socket
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Đã kết nối WebSocket");

  socket.on("chat", (chat) => {
    io.emit("chat", chat);
  });

  socket.on("disconnect", () => {
    console.log("Ngắt kết nối WebSocket");
  });
});
//----------------------------------------------------------------------------------------
//Bắt đầu kết nối port
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  connect();
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
