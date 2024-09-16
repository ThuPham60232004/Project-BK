import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "Holiday Inn Resort Batam",
      country: "Indonesia",
      review:
        "Booking đã linh hoạt cho tôi đổi phòng mà không tính phí, còn trả lại phần chênh lệch nữa chứ. Rất cảm ơn đội ngũ nhân viên Agoda và Holiday Inn!",
      author: "Andy đến từ Singapore",
    },
    {
      name: "Khách sạn Equatorial Melaka",
      country: "Malaysia",
      review:
        "Nhà mình đi cùng em bé nên có ghi rõ trong phần yêu cầu đặc biệt trên Agoda lúc đặt phòng. Nhân viên khách sạn rất tận tình và chu đáo. Cả nhà mình rất hài lòng.",
      author: "Raja đến từ Malaysia",
    },
    {
      name: "Khách sạn Heritage",
      country: "Philippines",
      review:
        "Tôi săn được giá đặc biệt giờ chót với Agoda. Phòng ốc rộng rãi, giường ngủ thoải mái và ấm cúng.",
      author: "Henry đến từ Úc",
    },
  ];

  return (
    <div className="testimonials">
      <h2>Tiếng lành đồn xa</h2>
      <div className="testimonialsContainer">
        {reviews.map((item, index) => (
          <div className="testimonialCard" key={index}>
            <h3>{item.name}</h3>
            <p className="country">ở {item.country}</p>
            <p className="review">
              {item.review}
              <span className="more">...thêm</span>
            </p>
            <p className="author">- {item.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
