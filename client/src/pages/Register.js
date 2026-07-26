import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/auth/register", formData);

      alert("Registration Successful!");
      navigate("/");
    } catch (err) {
      console.log("Full Error:", err);
      console.log("Response:", err.response);
      console.log("Data:", err.response?.data);
      console.log("Message:", err.message);

      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
            required
          />

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

          <button className="btn btn-success w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;