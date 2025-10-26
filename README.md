🧾 TicketApp — React Implementation
🧠 Overview

This is the React version of the HNG Stage 2 Frontend Task: Multi-Framework Ticket Management Web App.
It includes a landing page with SVG design, authentication (login/signup), a dashboard with ticket stats, and full CRUD ticket management — all simulated with localStorage.

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/hngFrontend2React.git
cd ticketapp-react

2️⃣ Install dependencies
npm install


Make sure you have Node.js (v16 or later) installed.

3️⃣ Run the development server
npm run dev


Your app will run locally at:
👉 http://localhost:5173

4️⃣ Build for production
npm run build


This creates an optimized dist/ folder with production-ready files.

5️⃣ Optional: Preview production build
npm run preview

🧩 Tech Stack

Framework: React (Vite)

State Management: useState, useEffect

Styling: Inline CSS + SVG (no external assets)

Storage: localStorage for mock authentication & tickets

Routing: React Router v6

🔑 Authentication Simulation

The app uses localStorage with key ticketapp_session to simulate login sessions.

Unauthorized users are automatically redirected to the /auth/login route.

🧱 CRUD Features
Action	Description
Create	Add a new ticket with validation
Read	View all tickets in dashboard cards
Update	Edit existing ticket details
Delete	Remove a ticket (with confirmation prompt)

Each action shows clear toast notifications and inline validation errors.

🧠 Status Colors
Status	Color
open	🟢 Green
in_progress	🟠 Amber
closed	⚪ Gray
💻 Running Notes

Fully responsive up to max-width: 1440px

Accessible colors & focus states

SVG wave + decorative circles designed inline (no assets folder required)

🧑‍💻 Example Test User
Email	Password
testuser@mail.com
	password123
📜 License

MIT License © 2025 — Built for HNG Internship (Frontend Stage 2)
Adelerekehinde
Live demo:    https://reactickets.netlify.app/
