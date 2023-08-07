import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8085/users/login", {
        email,
        password,
      });
      if (response.data.status) {
        navigate("/lecture");
        localStorage.setItem("jwt", response.data.data.jwt);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const GoToSignup = () => {
    navigate("/Signup");
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <br />
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <br />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <br />
        <button onClick={GoToSignup} className="btn btn-secondary">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
