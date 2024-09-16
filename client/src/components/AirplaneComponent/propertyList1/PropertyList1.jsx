import useFetch from "../../hooks/useFetch";
import "./propertyList1.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");

  const images = [
    "https://cdnmedia.baotintuc.vn/Upload/cVJiASFv9S8nriO7eNwA/files/2021/06/10-6/image001.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7P51L1QJDvOH1YDxUOhngVKXwar-SYZGSPWRV-5FA1A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ4iy-JlGYBTY9KbbGP_2yNH1q_c6y3wBfal7daxjtdw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR39iz6RSJvad1CB9dpWLJaOMr2DmUAYa3Q&s",
    "https://statics.vinpearl.com/du-lich-vinh-Ha-Long-hinh-anh3_1625912082.jpg",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                 <div className="pListTitles">
                  <h1>Việt Nam</h1>
            
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
