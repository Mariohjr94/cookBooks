import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Set your backend API URL
});

// Set Authorization header dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
