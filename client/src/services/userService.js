import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const getUserInfo = async (userId) => {
    try{
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error("Lỗi", error);
        throw error;
      }
};
export const updateUserInfo = async (userId, updatedUser) => {
    const response = await axios.put(`${API_URL}/users/${userId}`, updatedUser);
    return response.data;
};