import useFetch from "../../../hooks/useFetch";
import "./featured1.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,TPHCM,london"
  );

  return (
    <div className="featured">
      {loading ? ( 
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2024/01/06/thanh-pho-ha-noi.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hà Nội</h1>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://www.kynghidongduong.vn/images/destination/img1/3_tu-cam-thanh-bac-kinh-kynghidongduong-vn-36.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bắc Kinh</h1>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Paris</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
