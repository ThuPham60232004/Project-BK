import Navbar1 from "../../../components/AirplaneComponent/navbarAirplane/navbarAirplane";
import Header1 from "../../../components/AirplaneComponent/header1/Header1";
import MailList from "../../../components/mailList/MailList";
import Footer from "../../../components/AirplaneComponent/footer/Footer";
import Featured from "../../../components/AirplaneComponent/featured 1/Featured1";
import "./home.css";
import Service from "../../../components/AirplaneComponent/Service/Service"
import Partners from "../../../components/AirplaneComponent/Partners/Partners";
const Airplane = () => {
  return (
    <div>
      <Navbar1 />
      <Header1 />
      <br/><br/>
      <Featured/>
      <div className="homeContainer">
        <section className="section__container plan__container">
          <p className="subheader">HỖ TRỢ DU LỊCH</p>
          <h2 className="section__header">Lập kế hoạch du lịch của bạn với sự tự tin</h2>
          <p className="description">
            Tìm sự trợ giúp cho đặt phòng và kế hoạch du lịch của bạn, và xem những gì bạn có thể mong đợi trên hành trình của mình.
          </p>
          <div className="plan__grid">
            <div className="plan__content">
              <span className="number">01</span>
              <h4>Yêu cầu du lịch cho Dubai</h4>
              <p>
                Hãy thông tin và chuẩn bị cho chuyến đi của bạn đến Dubai với các yêu cầu du lịch cần thiết, đảm bảo một trải nghiệm mượt mà và không gặp trở ngại trong thành phố sôi động và quyến rũ này.
              </p>
              <span className="number">02</span>
              <h4>Bảo hiểm du lịch đa rủi ro</h4>
              <p>
                Bảo vệ toàn diện cho sự an tâm của bạn, bao gồm một loạt các rủi ro du lịch tiềm ẩn và tình huống bất ngờ.
              </p>
              <span className="number">03</span>
              <h4>Yêu cầu du lịch theo điểm đến</h4>
              <p>
                Hãy thông tin và lập kế hoạch cho chuyến đi của bạn một cách dễ dàng, khi chúng tôi cung cấp thông tin cập nhật về các yêu cầu du lịch cụ thể cho điểm đến mong muốn của bạn.
              </p>
            </div>
            <div className="plan__image">
              <img
                src="https://minhtuanmobile.com/uploads/blog/hinh-nen-iphone-may-bay-cuc-chat-cho-dan-dam-me-xe-dich-230427090116.jpg"
                alt="plan"
              />
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20220314/pngtree-the-plane-took-off-into-the-sky-image_1049735.jpg"
                alt="plan"
              />
              <img
                src="https://static.vinwonders.com/2022/10/cac-hang-ve-may-bay-banner.jpg"
                alt="plan"
              />
            </div>
          </div>
        </section>
        <section className="section__container plan__container">
        <p className="subheader">HỖ TRỢ ĐẶT VÉ</p>
        <h2 className="section__header">Theo dõi hướng dẫn để dễ dàng khám phá thế giới</h2>
        <p className="description">
            Tìm sự trợ giúp cho đặt phòng và kế hoạch du lịch của bạn, và xem những gì bạn có thể mong đợi trên hành trình của mình.
          </p>
        <Service/>

        </section>
        <section className="memories">
          <div className="section__container memories__container">
           
            <div className="memories__header">
              <h2 className="section__header">
                Du lịch để tạo ra những kỷ niệm khắp thế giới
              </h2>
              <button className="view__all">Xem tất cả</button>
            </div>
            <div className="memories__grid">
              <div className="memories__card">
                <span><i className="ri-calendar-2-line"></i></span>
                <h4>Đặt & thư giãn</h4>
                <p>
                  Với "Đặt và Thư giãn", bạn có thể ngồi lại, thư giãn và tận hưởng chuyến đi trong khi chúng tôi lo lắng cho mọi thứ khác.
                </p>
              </div>
              <div className="memories__card">
                <span><i className="ri-shield-check-line"></i></span>
                <h4>Checklist thông minh</h4>
                <p>
                  Giới thiệu Checklist Thông minh với chúng tôi, giải pháp đổi mới đang cách mạng hóa cách bạn du lịch với hãng hàng không của chúng tôi.
                </p>
              </div>
              <div className="memories__card">
                <span><i className="ri-bookmark-2-line"></i></span>
                <h4>Tiết kiệm hơn</h4>
                <p>
                  Từ giá vé giảm giá đến các khuyến mãi và ưu đãi độc quyền, chúng tôi ưu tiên về giá cả mà không ảnh hưởng đến chất lượng.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Partners/>
        <section className="section__container lounge__container">
          <div className="lounge__image">
            <img
              src="https://bizweb.dktcdn.net/100/349/716/files/meo-chon-cho-ngoi-ly-tuong-tren-may-bay-1.jpg?v=1587361926863"
              alt="lounge"
            />
            <img
              src="https://hangkhongmy.vn/wp-content/uploads/2018/03/chon-cho-ngoi-tren-may-bay-hnagkhongmy-5-768x576.jpg"
              alt="lounge"
            />
          </div>
          <div className="lounge__content">
            <h2 className="section__header">Phòng chờ cho trẻ em không được đi kèm</h2>
            <div className="lounge__grid">
              <div className="lounge__details">
                <h4>Kinh nghiệm yên bình</h4>
                <p>
                  Serenity Haven cung cấp một nơi trốn tránh yên bình, với ghế ngồi thoải mái, bầu không khí bình dị và dịch vụ chu đáo.
                </p>
              </div>
              <div className="lounge__details">
                <h4>Nâng cao trải nghiệm của bạn</h4>
                <p>
                  Thiết kế cho những người du lịch khôn ngoan, phòng chờ độc quyền này cung cấp các tiện ích cao cấp, hỗ trợ và không gian làm việc riêng tư.
                </p>
              </div>
              <div className="lounge__details">
                <h4>Một không gian chào đón</h4>
                <p>
                  Tạo ra một bầu không khí thân thiện với gia đình, Khu vui chơi Gia đình là nơi lý tưởng cho cha mẹ và trẻ em.
                </p>
              </div>
              <div className="lounge__details">
                <h4>Một trải nghiệm ẩm thực</h4>
                <p>
                  Đắm mình trong một thế giới các loại hương vị, cung cấp các món ăn quốc tế, món ăn cao cấp và đồ uống được chọn lọc cẩn thận.
                </p>
              </div>
            </div>
          </div>
        </section>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Airplane;
