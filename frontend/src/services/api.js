import axios from "axios";

// Base API URL
const API = axios.create({
   baseURL: "https://collect-dd4h.onrender.com",
});

// Add token automatically
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

export default API;