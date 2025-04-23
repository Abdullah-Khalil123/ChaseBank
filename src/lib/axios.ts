import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chase-bank-api.vercel.app/api", // Correct format
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
