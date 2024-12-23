// src/lib/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8001",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const { accessToken } = JSON.parse(userData);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code in the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Handle responses outside the range of 2xx
    if (error.response?.status === 401) {
      // Unauthorized: Handle token expiration
      localStorage.removeItem("user"); // Clear user data from localStorage
      window.location.href = "/auth/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
