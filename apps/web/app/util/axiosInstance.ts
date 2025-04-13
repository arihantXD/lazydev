import axios from "axios";
import backendUrl from "./backendUrl";

const axoisInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default axoisInstance;
