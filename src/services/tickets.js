import { v4 as uuidv4 } from "uuid";

const KEY = "ticketapp_tickets";

export function loadTickets() {
  try {
    const s = localStorage.getItem(KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

export function saveTickets(tickets) {
  localStorage.setItem(KEY, JSON.stringify(tickets));
}

export function createTicket({ title, status, description = "", priority = "low" }) {
  const tickets = loadTickets();
  const t = {
    id: uuidv4(),
    title: title.trim(),
    status,
    description: description.trim(),
    priority,
    createdAt: new Date().toISOString(),
  };
  tickets.unshift(t);
  saveTickets(tickets);
  return t;
}

export function updateTicket(id, data) {
  const tickets = loadTickets().map((t) => (t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t));
  saveTickets(tickets);
  return tickets.find((t) => t.id === id);
}

export function deleteTicket(id) {
  const tickets = loadTickets().filter((t) => t.id !== id);
  saveTickets(tickets);
}
