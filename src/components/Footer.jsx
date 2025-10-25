// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px 0",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #ddd",
        marginTop: "50px",
      }}
    >
      <p style={{ color: "#555", fontSize: "14px" }}>
        © {new Date().getFullYear()} TicketApp — All rights reserved.
      </p>
    </footer>
  );
}
