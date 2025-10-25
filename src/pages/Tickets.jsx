import React, { useEffect, useState } from "react";
import { loadTickets, createTicket, updateTicket, deleteTicket } from "../services/tickets";
import Modal from "../components/Modal";
import StatusTag from "../components/StatusTag";
import { pushToast } from "../components/Toast";

const VALID = ["open", "in_progress", "closed"];

function TicketRow({ ticket, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <div className="flex items-center gap-3">
          <h4 className="font-semibold">{ticket.title}</h4>
          <StatusTag status={ticket.status} />
        </div>
        <p className="text-sm text-gray-600 mt-2">{ticket.description}</p>
        <p className="text-xs text-gray-400 mt-1">Created: {new Date(ticket.createdAt).toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(ticket)} className="px-3 py-1 rounded-lg border border-gray-200">Edit</button>
        <button onClick={() => onDelete(ticket.id)} className="px-3 py-1 rounded-lg bg-red-600 text-white">Delete</button>
      </div>
    </div>
  );
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", status: "open", description: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTickets(loadTickets());
  }, []);

  function refresh() {
    setTickets(loadTickets());
  }

  function validate(data) {
    const e = {};
    if (!data.title || data.title.trim().length < 3) e.title = "Title is required (min 3 chars)";
    if (!VALID.includes(data.status)) e.status = "Status must be open, in_progress, or closed";
    if (data.description && data.description.length > 1000) e.description = "Description max 1000 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleCreateSubmit(e) {
    e.preventDefault();
    if (!validate(form)) {
      pushToast("Fix validation errors", "error");
      return;
    }
    createTicket(form);
    pushToast("Ticket created", "success");
    setForm({ title: "", status: "open", description: "" });
    setCreating(false);
    refresh();
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    if (!editing) return;
    if (!validate(form)) {
      pushToast("Fix validation errors", "error");
      return;
    }
    updateTicket(editing.id, form);
    pushToast("Ticket updated", "success");
    setEditing(null);
    setForm({ title: "", status: "open", description: "" });
    refresh();
  }

  function onStartEdit(ticket) {
    setEditing(ticket);
    setForm({ title: ticket.title, status: ticket.status, description: ticket.description || "" });
  }

  function onDelete(id) {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    deleteTicket(id);
    pushToast("Ticket deleted", "success");
    refresh();
  }

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tickets</h2>
        <div className="flex gap-3">
          <button onClick={() => setCreating(true)} className="bg-brand text-white px-4 py-2 rounded-lg">New Ticket</button>
        </div>
      </div>

      <div className="grid gap-4">
        {tickets.length === 0 && <div className="bg-white rounded-2xl p-6 shadow text-gray-600">No tickets yet. Create one!</div>}
        {tickets.map((t) => <TicketRow key={t.id} ticket={t} onEdit={onStartEdit} onDelete={onDelete} />)}
      </div>

      {/* Create modal */}
      <Modal open={creating} onClose={() => setCreating(false)} title="Create ticket">
        <form onSubmit={handleCreateSubmit} className="space-y-3">
          <label className="block">
            <span className="text-sm text-gray-700">Title</span>
            <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="mt-1 block w-full rounded-lg border-gray-200" />
            {errors.title && <small className="text-red-600">{errors.title}</small>}
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Status</span>
            <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} className="mt-1 block w-full rounded-lg border-gray-200">
              <option value="open">open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
            {errors.status && <small className="text-red-600">{errors.status}</small>}
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Description (optional)</span>
            <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="mt-1 block w-full rounded-lg border-gray-200" rows="4" />
            {errors.description && <small className="text-red-600">{errors.description}</small>}
          </label>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={()=>setCreating(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-brand text-white">Create</button>
          </div>
        </form>
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editing} onClose={() => { setEditing(null); setForm({ title: "", status: "open", description: "" }); }} title="Edit ticket">
        <form onSubmit={handleEditSubmit} className="space-y-3">
          <label className="block">
            <span className="text-sm text-gray-700">Title</span>
            <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="mt-1 block w-full rounded-lg border-gray-200" />
            {errors.title && <small className="text-red-600">{errors.title}</small>}
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Status</span>
            <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} className="mt-1 block w-full rounded-lg border-gray-200">
              <option value="open">open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
            {errors.status && <small className="text-red-600">{errors.status}</small>}
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Description (optional)</span>
            <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="mt-1 block w-full rounded-lg border-gray-200" rows="4" />
            {errors.description && <small className="text-red-600">{errors.description}</small>}
          </label>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => { setEditing(null); setForm({ title: "", status: "open", description: "" }); }} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-brand text-white">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
