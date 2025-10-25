import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 min-h-[calc(100vh-120px)]">
      <section className="container mx-auto max-w-[1440px] px-4 py-16 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Manage tickets faster — TicketPro</h1>
            <p className="text-gray-600 mb-6 max-w-xl">Create, track, and resolve support tickets with an elegant UI. Built as a multi-framework HNG Stage 2 project.</p>
            <div className="flex gap-3">
              <Link to="/auth/signup" className="bg-brand text-white px-5 py-3 rounded-lg">Get Started</Link>
              <Link to="/auth/login" className="px-5 py-3 rounded-lg border border-gray-200 text-gray-700">Login</Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-8 w-40 h-40 rounded-full bg-brand/10 blur-2xl" aria-hidden />
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold mb-2">Recent activity</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>Ticket #1023 created — Payment issue</li>
                <li>Ticket #1022 closed — Resolved by support</li>
                <li>New user signed up — demo@example.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* wave at bottom */}
        <img src="/hero-wave.svg" alt="wave" className="w-full absolute bottom-0 left-0 -z-10" />
      </section>
    </div>
  );
}

