import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("user_id") || 1;
  config.headers["X-User-ID"] = userId;
  return config;
});

export default api;
