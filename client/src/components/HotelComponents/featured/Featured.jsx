import useFetch from "../../../hooks/useFetch";
import "./featured1.css";

const Featured1 = () => {
  const { data, loading} = useFetch(
    "http://localhost:9000/api/hotels/countByCity?cities=New York,TPHCM,London"
  );

  return (
    <div>
      <h2>Các đất nước có chất lượng khách sạn tốt nhất:</h2>
      <div className="featured2">
      {loading ? ( 
        "Đang tải vui lòng chờ đơi"
      ) : (
        <>
          <div className="featuredItem2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7dNt1N3HRGAxb63b3p3GhU04dqfukQ171w&s"
              alt=""
              className="featuredImg2"
            />
            <div className="featuredTitles2">
              <h1>New York</h1>
              <h4>{data[0]} chỗ ở</h4>
            </div>
          </div>

          <div className="featuredItem2">
            <img
              src="https://hnm.1cdn.vn/2023/12/12/a355.jpg"
              alt=""
              className="featuredImg2"
            />
            <div className="featuredTitles2">
              <h1>TPHCM</h1>
              <h4>{data[1]} chỗ ở </h4>
            </div>
          </div>
          <div className="featuredItem2">
            <img
              src="https://traveler.marriott.com/wp-content/uploads/2022/12/trafalgar-square-down-whitehall-london-england-1920x1080-1.jpg"
              alt=""
              className="featuredImg2"
            />
            <div className="featuredTitles2">
              <h1>London</h1>
              <h4>{data[2]} chỗ ở</h4>
            </div>
          </div>
        </>
      )}
    </div>
    </div>
    
  );
};

export default Featured1;
