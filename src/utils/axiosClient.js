import axios from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "./auth";

const api = axios.create({
  baseURL: "/api",
});

// attach token to every request
api.interceptors.request.use((req) => {
  const token = getAccessToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401) {
      const refresh = getRefreshToken();
      if (!refresh) {
        clearTokens();
        window.location.href = "/login";
        return;
      }
      const { data } = await axios.post("/api/refresh", {
        refreshToken: refresh,
      });
      saveTokens(data.accessToken, data.refreshToken);
      err.config.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(err.config);
    }
    return Promise.reject(err);
  }
);

export default api;
