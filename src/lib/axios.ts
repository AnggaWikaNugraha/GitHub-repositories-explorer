// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

api.interceptors.request.use(
  (config) => {
    // Tambahkan header atau token jika perlu
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
