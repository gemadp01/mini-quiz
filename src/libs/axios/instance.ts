import axios from "axios";

const API_BASE_URL = "/api";

const headers = {
  "Content-Type": "application/json",
};

export const instance = axios.create({
  baseURL: API_BASE_URL,
  headers,
});
