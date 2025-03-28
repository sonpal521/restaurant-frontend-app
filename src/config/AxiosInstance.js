import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000, // Timeout set to 5 seconds (5000ms)
});

export default axiosInstance;
