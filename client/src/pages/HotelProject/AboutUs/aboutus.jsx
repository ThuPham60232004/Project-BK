import React from 'react';
import './aboutus.css';
import Navbar from "../../../components/HotelComponents/navbar/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <section className="about-section">
          <div className="about-content">
            <div className="about-image">
              <img src="https://elitetour.com.vn/files/images/Blogs/Combo-Intercontinental-Phu-Quoc.jpg" alt="Room View" />
            </div>
            <div className="about-text">
              <h2>GIỚI THIỆU CHUNG</h2>
              <p>Trang web đặt khách sạn là một nền tảng trực tuyến giúp người dùng tìm kiếm, so sánh, và đặt phòng khách sạn tại nhiều địa điểm trên thế giới. Những trang web này cho phép người dùng dễ dàng tra cứu các khách sạn, nhà nghỉ, resort hoặc căn hộ dựa trên vị trí, giá cả, loại phòng, và tiện nghi mà họ mong muốn.</p>
            </div>
          </div>
        </section>
        <section className="about-section reverse">
          <div className="about-content">
            <div className="about-text">
              <h2>THƯ NGỎ</h2>
              <p>Bạn đang lên kế hoạch cho một kỳ nghỉ, chuyến công tác, hay một cuộc phiêu lưu khám phá, BookingThu luôn sẵn sàng mang đến cho bạn các lựa chọn lưu trú phù hợp với mọi nhu cầu và ngân sách. Chúng tôi cam kết cung cấp giá cả cạnh tranh, thông tin đánh giá chân thực từ người dùng, và nhiều ưu đãi đặc biệt giúp bạn có được trải nghiệm tốt nhất.</p>
            </div>
            <div className="about-image">
              <img src="https://dulichdalat.pro/wp-content/uploads/2020/02/khach-san-sammy-da-lat-scaled.jpg" alt="Hotel Night View" />
            </div>
          </div>
        </section>
        <section className="about-section">
          <div className="about-content">
            <div className="about-image">
              <img src="https://www.bvtttw1.com.vn/wp-content/uploads/2020/10/khach-san-chau-long-Khach-san-sapa-co-view-dep.jpg" alt="Beach View" />
            </div>
            <div className="about-text">
              <h2>Những Ưu Đãi</h2>
              <p> BookingThu nơi giúp bạn đặt phòng khách sạn một cách nhanh chóng và tiết kiệm nhất! Để tri ân khách hàng, chúng tôi mang đến ưu đãi đặc biệt dành riêng cho bạn</p>
              <p>Giảm giá đến 50% cho các khách sạn hàng đầu tại các điểm du lịch nổi tiếng.</p>
              <p>Ưu đãi độc quyền cho thành viên, giúp bạn nhận được mức giá tốt hơn so với giá công khai.</p>
              <p>Miễn phí hủy phòng cho các đặt phòng linh hoạt, mang đến sự an tâm cho kế hoạch du lịch của bạn.</p>
              <p>Nhanh tay đặt phòng ngay hôm nay để tận hưởng giá tốt nhất và không bỏ lỡ những ưu đãi hấp dẫn từ BookingThu </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;