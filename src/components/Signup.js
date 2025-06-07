import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response.data.msg);
    }
  };

  return (
    <div>
      <h3>Signup</h3>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSignup}>Register</button>
      <p>{msg}</p>
    </div>
  );
}

export default Signup;
