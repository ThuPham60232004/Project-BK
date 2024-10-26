import axios from 'axios';

export const logActivity = async (userId, pathname, duration) => {
    console.log('Hoạt động ghi nhật ký:', { userId, pathname, duration }); // Kiểm tra giá trị
    try {
      const response = await axios.post('http://localhost:9000/api/userActivity/log', {
        userId,
        pathname,
        duration
      });
      console.log('Hoạt động ghi nhật ký:', response.data);
    } catch (error) {
      console.error('Lỗi ghi nhật ký hoạt động:', error);
      if (error.response) {
        console.error('Máy chủ đã phản hồi với:', error.response.data);
      } else if (error.request) {
        console.error('Yêu cầu đã được thực hiện nhưng không nhận được phản hồi:', error.request);
      } else {
        console.error('Lỗi thiết lập yêu cầu:', error.message);
      }
    }
  };
  