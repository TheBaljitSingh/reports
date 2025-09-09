import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  withCredentials: true, // if you're using cookies
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from context
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      console.warn("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;
