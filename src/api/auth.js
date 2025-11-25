import api from "../utils/axiosClient";
export const login = (body) => api.post("/auth/login", body);
export const signup = (body) => api.post("/auth/signup", body);
