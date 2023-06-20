import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
const axiosInstance = axios.create({
  baseURL: base_url,
  headers: config.headers,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("user")?.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const login = async (userData) => {
  const response = await axiosInstance.post("user/admin-login", userData);
  if (response.data) {
    const token = response.data.token;
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axiosInstance.get(
    `${base_url}user/getAllorders`,
    config
  );

  return response.data;
};
const getOrder = async (id) => {
  const response = await axiosInstance.get(
    `${base_url}user/getsingleOrder/${id}`,
    config
  );

  return response.data;
};

const updateOrder = async (data) => {
  const response = await axiosInstance.put(
    `${base_url}user/updateOrder/${data.id}`,
    { status: data.status },
    config
  );

  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axiosInstance.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config
  );

  return response.data;
};

const getYearlyStats = async () => {
  const response = await axiosInstance.get(
    `${base_url}user/getYearlyOrders`,
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
};
export default authService;
