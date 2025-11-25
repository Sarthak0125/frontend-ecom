import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../api/auth";
import { saveTokens } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login(form);
    // console.log(data)
    saveTokens(data.accessToken, data.refreshToken);

    if (data.user.role === "admin") navigate("/admin");
    else navigate("/customer");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        className="p-4 bg-white rounded shadow w-100"
        style={{ maxWidth: "400px" }}
        onSubmit={onSubmit}
      >
        <h3 className="text-center mb-4">Login</h3>

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

        <Button type="submit">Login</Button>

        <p className="text-center mt-2">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
