import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'https://hcp-backend.onrender.com';
const api = axios.create({
    baseURL: BACKEND_URL
});

export const getPrediction = async (symptoms) => {
    try {
        const response = await api.post('/predict', { symptoms });
        return response.data;
    } catch (error) {
        console.error('Prediction error:', error);
        throw error;
    }
};

export default api;
