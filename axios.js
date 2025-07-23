// src/api/axios.js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000", // replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
