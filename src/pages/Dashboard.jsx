import React from "react";
import { loadTickets } from "../services/tickets";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const tickets = loadTickets();
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Link to="/tickets" className="text-brand underline">Manage tickets</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-sm text-gray-500">Total Tickets</p>
          <p className="text-3xl font-extrabold">{total}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-sm text-gray-500">Open</p>
          <p className="text-3xl font-extrabold text-open">{open}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-3xl font-extrabold text-closed">{closed}</p>
        </div>
      </div>
    </div>
  );
}
