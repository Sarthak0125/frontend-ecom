import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import AdminDashboard from "./pages/AdminDashboard";
// import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./layouts/ProtectedRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomDashboard";
import ProtectedRoutes from "./layouts/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
