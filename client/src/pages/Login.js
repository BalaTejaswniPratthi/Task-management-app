import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="text-center mb-4">Task Management</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;