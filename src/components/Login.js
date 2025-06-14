import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Trying to login with:", email, password);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        // Save token
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful!");

        // ✅ Set login state in App.js
        setIsLoggedIn(true);

        // ✅ Redirect to book list
        navigate("/books");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.msg) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
