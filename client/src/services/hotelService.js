import axios from 'axios';

export const getHotels = async () => {
  try {
    const response = await axios.get('http://localhost:9000/api/hotels/all/');
    return response.data;
  } catch (error) {
    console.error('Không thể lấy danh sách khách sạn:', error);
    throw error; // Ném lỗi lên trên để xử lý
  }
};

export const getRooms = async (hotelId) => {
  try {
    const response = await axios.get(`http://localhost:9000/api/rooms/hotel/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error('Không thể lấy danh sách phòng:', error);
    throw error; // Ném lỗi lên trên để xử lý
  }
};
