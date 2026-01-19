import environment from "@/config/environment";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export const instance = axios.create({
  baseURL: `${environment.APP_URL}/api`,
  headers,
  withCredentials: true,
});
