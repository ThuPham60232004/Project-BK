// Import các thư viện cần thiết
import { useEffect, useState } from "react";
import axios from "axios";

// Định nghĩa hook useFetch
const useFetch = (url) => {
  // Quản lý trạng thái dữ liệu, loading và error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Sử dụng useEffect để gọi API khi component được render
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Bắt đầu quá trình loading
      try {
        const res = await axios.get(url); 
        setData(res.data); 
      } catch (err) {
        setError(err); 
      }
      setLoading(false); 
    };
    fetchData();
  }, [url]); 


  const reFetch = async () => {
    setLoading(true); // Bắt đầu quá trình loading
    try {
      const res = await axios.get(url); // Gửi yêu cầu GET tới API
      setData(res.data); // Lưu dữ liệu nhận được vào state data
    } catch (err) {
      setError(err); // Lưu lỗi nếu có
    }
    setLoading(false); // Kết thúc quá trình loading
  };

  // Trả về các state và hàm reFetch
  return { data, loading, error, reFetch };
};

export default useFetch;
