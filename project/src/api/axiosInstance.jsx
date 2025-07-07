
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Change this to your actual backend URL
});

export default axiosInstance;
