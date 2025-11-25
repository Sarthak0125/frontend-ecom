import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

export default function ProtectedRoutes({ children }) {
    const token = getAccessToken();
    return token ? children : <Navigate to="/login" />;
}