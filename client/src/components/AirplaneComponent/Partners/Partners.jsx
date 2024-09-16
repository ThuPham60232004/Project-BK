import React from 'react';
import './Partners.css'; 

const Partners = () => {
    const airlinePartners = [
        'https://fedudesign.vn/wp-content/uploads/2020/08/unnamed.jpg',
        'http://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/3e4ba930-ea1f-4a72-a8b1-252a62cdde6b.jpg',
        'http://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/vietnam-airline-logo.jpg',
        'https://designs.vn/wp-content/images/26-01-2015/thietke-logo-hanghangkhong-36.jpg',
        'https://download.logo.wine/logo/Oman_Air/Oman_Air-Logo.wine.png',
        'http://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/logo%2C%2C%2C/y-nghia-logo-vietjet.jpg',
        'http://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/logo%2C%2C%2C/logo-hang-hang-khong-pacific-airlines-co-diem-gi-noi-bat-4.jpg',
        'https://designs.vn/wp-content/images/23-03-2014/Nhung%20-logo-noi-tieng-cua-30-hang-hang-khong-tren-toan-the-gioi%20(20).jpg',
        'https://e7.pngegg.com/pngimages/778/480/png-clipart-doha-qatar-airways-airline-auckland-airport-skytrax-emirates-airline-text-logo.png',
        'https://logos-download.com/wp-content/uploads/2016/05/AirAsia_logo_logotype_circle.png',
        'https://i.pinimg.com/originals/67/6c/60/676c60b4d567f955866b857075925d55.jpg',
        'http://logos-download.com/wp-content/uploads/2016/03/Emirates_Airlines_logotype_emblem_logo_4.png',
        'https://i.pinimg.com/originals/35/f1/dc/35f1dc5b9125c1da37b61ac0f952b2c1.png',
        'https://www.logotypes101.com/logos/239/4E7E95AF771E3C24A5CAA6C77827B830/Bangkok_Airways.png',
        'https://logos-world.net/wp-content/uploads/2020/03/Air-France-Logo-1976-1990.jpg',
        'https://logos-world.net/wp-content/uploads/2020/11/United-Airlines-Logo-1954-1960.png',
        'https://vectorseek.com/wp-content/uploads/2023/10/Etihad-Airways-Abu-Dhabi-Logo-Vector.svg-.png',
        'http://www.ranklogos.com/wp-content/uploads/2012/04/american-airlines-logo-1.jpg',
        'https://i.pinimg.com/736x/2b/40/89/2b408945492440dc57c69125934686bc--corporate-logos-malaysia.jpg',
        'https://1000logos.net/wp-content/uploads/2020/03/Spirit-Airlines-Logo-2007.jpg',
        'https://designs.vn/wp-content/images/23-03-2014/Nhung%20-logo-noi-tieng-cua-30-hang-hang-khong-tren-toan-the-gioi.jpg',
        'https://png.pngtree.com/png-clipart/20200727/original/pngtree-air-force-learning-plan-logo-design-luxury-airline-transport-png-image_5349644.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnvBqLTXyjHqLHEhf6ncIu28Z3f8rXEwDP0A&s',
        'https://static.wixstatic.com/media/9d8ed5_b51a481fd4b94e1fb36d99d4377455ee~mv2.jpg/v1/fill/w_980,h_613,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9d8ed5_b51a481fd4b94e1fb36d99d4377455ee~mv2.jpg'

      ];
    
      const paymentPartners = [
        'https://media.tempe.com.vn/default/images/no-image-news.jpg',
        'https://rubee.com.vn/admin/webroot/upload/image/images/teckcombank-logo.jpg',
        'https://rubee.com.vn/wp-content/uploads/2022/01/logo-vietinbank.jpg',
        'https://uploads-ssl.webflow.com/5fb85f26f126ce08d792d2d9/62ce8018d5cacb6b28727421_MB%20bank%20logo.jpg',
        'https://brandlogos.net/wp-content/uploads/2022/04/bidv-logo-brandlogos.net_.png',
        'https://cdn.dribbble.com/users/3602838/screenshots/6575346/tpb-02.jpg',
        'https://quatangphale.com.vn/uploads/du-an/du-an-2020/logo-agribank.jpg',
        'https://brandlogos.net/wp-content/uploads/2020/11/sacombank-logo-512x512.png',
        'https://inkythuatso.com/uploads/images/2021/11/logo-acb-vector-inkythuatso-01-10-10-25-09.jpg',
        'https://static.wixstatic.com/media/9d8ed5_a0460a6fe5744d3d85bab67d5f7459f3~mv2.jpg/v1/fill/w_980,h_613,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9d8ed5_a0460a6fe5744d3d85bab67d5f7459f3~mv2.jpg',
        'https://img6.thuthuatphanmem.vn/uploads/2022/05/12/logo-bidv-moi_112344314.png',
        'https://seeklogo.com/images/M/momo-logo-ED8A3A0DF2-seeklogo.com.png',
        'https://www.senviet.art/wp-content/uploads/edd/2017/08/logo-dong-a-bank.jpg',
        'https://static.wixstatic.com/media/9d8ed5_0f9b1175f94f4ce4a6789d63a1540044~mv2.png/v1/fit/w_500,h_500,q_90/file.png',
        'https://inkythuatso.com/uploads/images/2021/12/logo-vib-inkythuatso-3-21-13-43-27.jpg',
        'https://dongphucvina.vn/wp-content/uploads/2023/05/logo-scb-dongphucvina.vn1_.png',
        'https://static.vecteezy.com/system/resources/previews/015/579/640/non_2x/shb-letter-logo-design-on-white-background-shb-creative-initials-circle-logo-concept-shb-letter-design-vector.jpg',
        'https://www.senviet.art/wp-content/uploads/edd/2017/08/logo-seabank.jpg',
        'https://wikiland.vn/wp-content/uploads/Logo-OceanBank-V-630x720.png',
        'https://cashgo.vn/wp-content/uploads/2021/07/gpbank-3.jpg',
        'https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/Snag_111e7e07.png',
        'https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSmBLHlc-PjLtpHk9Zg5f4jCE2pMls7v1OQ&s',
        'https://bcp.cdnchinhphu.vn/Uploaded/truonggiangthanh/2021_11_10/klb.jpg'
      ];

  return (
    <div className="partners-section">
      {/* Airline Partners Section */}
      <div className="partner-group">
        <div className="partner-info">
          <h2>Đối tác hàng không</h2>
          <p>Đối tác hàng không nội địa và quốc tế</p>
          <p>
            Những đối tác hàng không toàn cầu sẽ chắp cánh đưa bạn đến mọi địa điểm trên thế giới.
          </p>
        </div>
        <div className="logo-grid">
          {airlinePartners.map((logo, index) => (
            <img key={index} src={logo} alt={`Airline ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="partner-group">
        <div className="partner-info">
          <h2>Đối tác thanh toán</h2>
          <p>
            Những đối tác thanh toán đáng tin cậy của chúng tôi sẽ giúp cho bạn luôn an tâm thực hiện
            mọi giao dịch một cách thuận lợi nhất!
          </p>
        </div>
        <div className="logo-grid">
          {paymentPartners.map((logo, index) => (
            <img key={index} src={logo} alt={`Payment ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;