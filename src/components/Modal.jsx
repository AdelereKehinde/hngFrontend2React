import React, { useEffect } from "react";

export default function Modal({ children, open, onClose, title }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 z-50">
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" aria-label="Close modal">✕</button>
      </div>
    </div>
  );
}
