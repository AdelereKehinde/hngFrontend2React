import React from "react";
const classes = {
  open: "text-open bg-open/10",
  in_progress: "text-in_progress bg-in_progress/10",
  closed: "text-closed bg-closed/10",
};
export default function StatusTag({ status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${classes[status] || "text-gray-600 bg-gray-100"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
