import React from 'react';
import'./Service.css';

const Service = () => {
  return (
    <div>
      <h2>Quy trình hướng dẫn đặt phòng:</h2>
      <div className="service">
       <div className="service_box">
        <div className="service_box_item">
          <img
            src="/img/service-1.png"
            alt="Tìm kiếm"
            width={50}
            height={100}
          />
          <p className="service_box_item_step">
            <span className="service_box_item_step_span">Bước 1</span>
          </p>
          <h3>Tìm kiếm</h3>
          <p>Chọn thông tin, dữ liệu và bạn mong muốn rồi bấm nút tìm kiếm</p>
        </div>
  
      <div className="service_box_item">
        <img
          src="/img/service-2.png"
          alt="Chọn khách sạn"
          width={50}
          height={100}
        />
        <p className="service_box_item_step">
          <span className="service_box_item_step_span">Bước 2</span>
        </p> 
        <h3>Chọn khách sạn</h3>
        <p>Đọc các thông tin khách sạn và chọn khách sạn mình mong muốn</p>
      </div>
  
      <div className="service_box_item">
        <img
          src="/img/service-3.png"
          alt="Chọn phòng"
          width={50}
          height={100}
        />
        <p className="service_box_item_step">
          <span className="service_box_item_step_span">Bước 3</span>
        </p>
        <h3>Chọn phòng</h3>
        <p>Sau khi chọn khách sạn, bấm vào trang xem chi tiết và chọn phòng mà bạn muốn</p>
      </div>
  
      <div className="service_box_item">
        <img
          src="/img/service-4.png"
          alt="Thanh toán"
          width={50}
          height={100}
        />
        <p className="service_box_item_step">
          <span className="service_box_item_step_span">Bước 4</span>
        </p>
        <h3>Thanh toán</h3>
        <p>Đọc lại thông tin đặt phòng, áp dụng mã giảm giá và thanh toán</p>
      </div>
    </div>
  </div>
    </div>
  );
};

export default Service;
