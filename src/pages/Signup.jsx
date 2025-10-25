import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth";
import { pushToast } from "../components/Toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      pushToast("All fields are required", "error");
      return;
    }
    signup({ name, email, password });
    pushToast("Account created", "success");
    nav("/dashboard");
  }

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-3">
            <span className="text-sm text-gray-700">Full name</span>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-200" />
          </label>
          <label className="block mb-3">
            <span className="text-sm text-gray-700">Email</span>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-200" />
          </label>
          <label className="block mb-4">
            <span className="text-sm text-gray-700">Password</span>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-200" />
          </label>

          <button type="submit" className="w-full bg-brand text-white py-2 rounded-lg">Sign up</button>
        </form>
      </div>
    </div>
  );
}

