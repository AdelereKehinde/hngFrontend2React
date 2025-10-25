import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/auth";

export default function Header() {
  const auth = isAuthenticated();
  const nav = useNavigate();

  function onLogout() {
    logout();
    nav("/");
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto max-w-[1440px] px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold">TP</div>
          <span className="font-bold text-lg">TicketPro</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/40 px-2 py-1 rounded">Home</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-brand px-2 py-1 rounded">Dashboard</Link>
          <Link to="/tickets" className="text-gray-600 hover:text-brand px-2 py-1 rounded">Tickets</Link>
          {auth ? (
            <button onClick={onLogout} className="bg-brand text-white px-3 py-1 rounded-lg">Logout</button>
          ) : (
            <Link to="/auth/login" className="text-white bg-brand px-3 py-1 rounded-lg">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
