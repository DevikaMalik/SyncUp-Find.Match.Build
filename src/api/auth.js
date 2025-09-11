import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend base URL
});

// Register API
export const registerUser = async (userData) => {
  const { data } = await API.post("/register", userData);
  return data;
};

// Login API
export const loginUser = async (userData) => {
  const { data } = await API.post("/login", userData);
  return data;
};
