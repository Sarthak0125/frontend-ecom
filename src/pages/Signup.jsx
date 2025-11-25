import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { signup } from "../api/auth";
import { saveTokens } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await signup(form);
      saveTokens(data.accessToken, data.refreshToken);
      alert("Signup successful!");
    navigate("/login");
    //   if (data.user.role === "admin") navigate("/admin");
    //   else navigate("/customer");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        className="p-4 bg-white rounded shadow w-100"
        style={{ maxWidth: "400px" }}
        onSubmit={onSubmit}
      >
        <h3 className="text-center mb-4">Sign Up</h3>

        <Input
          label="Name"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button type="submit">Create Account</Button>

        <p className="text-center mt-2">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
