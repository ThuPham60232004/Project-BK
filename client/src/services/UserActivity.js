import axios from 'axios';

export const logActivity = async (userId, pathname, duration) => {
    console.log('Logging activity:', { userId, pathname, duration }); // Kiểm tra giá trị
    try {
      const response = await axios.post('http://localhost:9000/api/userActivity/log', {
        userId,
        pathname,
        duration
      });
      console.log('Activity logged:', response.data);
    } catch (error) {
      console.error('Error logging activity:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('Request was made but no response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };
  