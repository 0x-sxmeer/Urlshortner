# LinkPulse Frontend

Smart Link Governance & URL Management Platform.

LinkPulse is a modern, campaign-aware link management platform featuring real-time click telemetry, automated bot detection & filtering, QR code generation, team campaign tagging, CSV batch imports, and an administrative governance console for takedowns and domain blocklists.

---

## Features

- **Dashboard & Telemetry**: Live click telemetry, bot share tracking, visitor analytics, and link health alerts.
- **Rule Engine**: Expiration timestamps, maximum click caps, and password-protected link gates.
- **Campaigns & Tags**: Multi-channel campaign attribution, top-performing link highlights, and tag management.
- **Batch CSV Import**: Instant preview with format validation, error highlighting, and deduplication.
- **Governance & Admin Suite**:
  - Global link takedown and reinstatement controls.
  - User authorization & role management (`admin` / `user`).
  - Domain blocklist for malware and phishing prevention.
  - Real-time audit log of security and moderation events.
- **Zero-Backend Demo Mode**: Out-of-the-box offline demonstration mode with mock telemetry and interactive flows.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management & Data Fetching**: [TanStack Query v5](https://tanstack.com/query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally in Demo Mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Demo mode is enabled by default via `.env.development`:

```env
VITE_DEMO_MODE=true
VITE_API_URL=/api
```

### 3. Connect to FastAPI Backend

When your FastAPI backend is running locally on port 8000, set in `.env.development`:

```env
VITE_DEMO_MODE=false
VITE_API_URL=/api
```

Vite's proxy will forward `/api/*` requests to `http://127.0.0.1:8000`.

### 4. Build for Production

```bash
npm run build
```

Production artifacts will be generated in `dist/`.
