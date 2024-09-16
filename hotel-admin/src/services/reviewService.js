import axios from 'axios';

export const getReviews = async () => {
  try {
    const response = await axios.get('http://localhost:9000/api/reviews');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await axios.post('http://localhost:9000/api/reviews', reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await axios.put(`http://localhost:9000/api/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`http://localhost:9000/api/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
