import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/users/login"
        : "http://localhost:5000/api/users";

      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert(isLogin ? "✅ Login Successful!" : "✅ Registration Successful!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setName(""); setEmail(""); setPassword("");
    } catch (error) {
      alert("❌ Error: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <p>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            className="auth-toggle"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
