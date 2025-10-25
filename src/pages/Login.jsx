import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";
import { pushToast } from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("Password123!");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  function validate() {
    const e = {};
    if (!email) e.email = "Email is required";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const res = login({ email, password });
    if (res.ok) {
      pushToast("Login successful", "success");
      nav("/dashboard");
    } else {
      pushToast(res.error || "Login failed", "error");
    }
  }

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label className="block mb-3">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-200" />
            {errors.email && <small className="text-red-600">{errors.email}</small>}
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-200" />
            {errors.password && <small className="text-red-600">{errors.password}</small>}
          </label>

          <button type="submit" className="w-full bg-brand text-white py-2 rounded-lg">Login</button>
        </form>

        <p className="mt-4 text-sm text-gray-600">Demo: demo@example.com / Password123!</p>
        <p className="mt-3 text-sm">Don't have an account? <Link to="/auth/signup" className="text-brand">Sign up</Link></p>
      </div>
    </div>
  );
}
