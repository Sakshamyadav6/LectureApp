import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8085/users/register",
        {
          username,
          email,
          password,
        }
      );
      if (response.data.status) {
        navigate("/lecture");
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const GoToLogin = () => {
    navigate("/signin");
  };

  return (
    <div className="container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        <br />
        <button onClick={GoToLogin} className="btn btn-secondary">
          Log In
        </button>
      </div>
    </div>
  );
};

export default Signup;
