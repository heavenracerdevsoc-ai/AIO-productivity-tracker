import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic client-side auth: accept any non-empty username/password
    if (username.trim() && password.trim()) {
      dispatch(login({ username }));
    } else {
      alert("Enter username and password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: 380, padding: 24, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }}>
        <h2 style={{ marginBottom: 12, color: "var(--text)", fontFamily: "var(--font-serif)" }}>Welcome</h2>
        <label style={{ display: "block", marginBottom: 8, color: "var(--text-muted)", fontSize: 13 }}>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" style={{ width: "100%", padding: 8, marginBottom: 12 }} />
        <label style={{ display: "block", marginBottom: 8, color: "var(--text-muted)", fontSize: 13 }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" style={{ width: "100%", padding: 8, marginBottom: 12 }} />
        <button type="submit" style={{ width: "100%", padding: 10, background: "var(--accent)", border: "none", borderRadius: 6, color: "#000" }}>Sign in</button>
      </form>
    </div>
  );
};

export default Auth;
