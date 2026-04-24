# 💊 Vedatrust — Trust-First E-Pharmacy Verification Platform

> *"Verify Before You Trust"* — Empowering patients with transparent, verified, and safe online medicine procurement across India.

---

## 📌 Problem Statement

### Why do patients risk their health buying medicines online?

**Domain:** HealthTech / E-Pharmacy

Patients across India — especially chronic patients, elderly individuals, and those in smaller towns — hesitate or avoid buying essential medicines on e-pharmacy platforms because there is **no reliable way to instantly verify drug authenticity, expiry, batch legitimacy, or proper storage conditions** before or after delivery.

Existing platforms lack:
- ❌ Mandatory prescription verification
- ❌ Temperature-controlled logistics tracking
- ❌ Holographic or QR-based batch verification
- ❌ Transparent sourcing and supply chain visibility

This exposes buyers to **counterfeit, substandard, or expired drugs** that can cause treatment failure, severe side effects, or even life-threatening complications.

---

## ✅ Solution

**Vedatrust** introduces a trust-first verification system that allows users to:

- 📱 **Scan medicines** using QR codes for instant authenticity checks
- 📜 **Upload and validate prescriptions** through a secure multi-step flow
- 🏪 **Purchase from verified pharmacies only** — every listed pharmacy is licensed and vetted
- 🧾 **View detailed medicine information** with trust indicators and supply chain audits

### 🔑 Key Features

| Feature | Description |
|--------|-------------|
| 🔍 QR-Based Verification | Scan medicine QR → view authenticity, batch, expiry, manufacturer |
| 📤 Prescription Upload | Multi-step form with cryptographic validation of medical details |
| 🏪 Verified Pharmacies | Only licensed pharmacies listed with badge, rating, and location |
| 🧾 Medicine Details | Batch number, expiry, manufacturer, trust score, scan history |
| 📊 Patient Dashboard | Bird's-eye view of total scans, verified medicines, recent activity |
| 🔔 Safety Alerts | Real-time notifications for counterfeit detections and expiry reminders |

---

## 🎨 Figma Design

> ⚠️ **Design approval is mandatory before development begins.**

| Resource | Link |
|----------|------|
| 🖥️ Figma Desktop Design | [View Figma File](https://www.figma.com/design/zLuuG6BBavfyCUc7Kh075f/Untitled?node-id=0-1&t=apI1qZH5a7QMcOFP-1) |

### Design System

| Token | Value |
|-------|-------|
| Primary Color | `#0EA5E9` — Sky Blue (trust & health) |
| Secondary Color | `#10B981` — Emerald (safety & verified) |
| Danger / Risk | `#EF4444` |
| Warning | `#F59E0B` |
| Background Light | `#F8FAFC` |
| Background Dark | `#0F172A` |
| Font Family | Inter — 400 / 500 / 600 / 700 |
| Border Radius | 8px (cards), 4px (inputs) |
| Spacing Scale | 4px base unit |

### Screens Designed

| Area | Pages |
|------|-------|
| **Public & Onboarding** | Landing Page, Login, Signup, Forgot Password |
| **Verification Core** | QR Scan (Empty State), Medicine Detail + QR Modal, Medicine Detail (Full View) |
| **Patient Dashboard** | Dashboard Overview, Verification History, Prescription Upload |
| **Trusted Network** | Pharmacy Locator, Notifications Feed |
| **Account & System** | Profile, Settings (Theme / Security) |
| **System States** | 404, Empty State, Error State |

---

## 📄 Pages & User Flow

### 1. 🌐 Public & Onboarding *(Entry Point)*
- **Landing Page** — Explains the "Verify Before You Trust" value proposition; drives users to scan a medicine or sign up
- **Login & Signup** — Secure portals for patients and providers with trust badges for a professional first impression
- **Forgot Password** — Streamlined flow for secure account recovery

### 2. 🔍 The Verification Core *(Main Feature)*
- **QR Scan (Empty State)** — Focused interface to upload or scan a medicine's unique code
- **Medicine Detail + QR Modal** — The "magic moment": a successful scan triggers a high-fidelity modal with background blur showing "Authentic" status, batch info, and expiry date
- **Medicine Detail (Full View)** — Deep dive into medication origin, global supply chain journey, and full audit trail

### 3. 📊 Patient Dashboard & Management
- **Dashboard** — Nerve center: total scans, verified medicines, and recent activity at a glance
- **Verification History** — Searchable ledger of every medicine scanned, categorized by status (Safe / Warning / Risk)
- **Prescription Upload** — Secure tool for patients to digitize and cryptographically validate physical prescriptions

### 4. 🏪 Trusted Network & Support
- **Pharmacy Locator** — Directory of vetted pharmacies with "Verified" badge and license info
- **Notifications** — Centralized feed for safety alerts: counterfeit detections, expiry reminders

### 5. ⚙️ Account & System
- **Profile** — Manage personal healthcare credentials and saved prescriptions
- **Settings** — Theme toggle (Light/Dark), security preferences

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Build Tool** | Vite |
| **Framework** | React 18 |
| **Styling** | Tailwind CSS + MUI (Material UI) |
| **Routing** | React Router v6 |
| **State Management** | Redux Toolkit |
| **Forms & Validation** | Formik + Yup |
| **HTTP Client** | Axios (with interceptors) |
| **Notifications** | React Hot Toast |
| **SEO** | React Helmet Async |
| **Analytics** | Google Analytics GA4 |
| **Icons** | MUI Icons + Lucide React |
| **Theme** | MUI ThemeProvider + Tailwind dark mode |
| **Code Quality** | ESLint + Prettier |

---

## 📁 Folder Structure

```
vedaTrust/
├── frontend/                        # React + Vite Frontend
│   ├── public/
│   │   ├── favicon.ico
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/              # UI Component Library
│   │   │   ├── ui/ (Button, Input, Modal, Card, etc.)
│   │   │   ├── layout/ (Navbar, Sidebar, Footer)
│   │   │   ├── feedback/ (EmptyState, ErrorState)
│   │   │   └── forms/ (FormInput, FormSelect)
│   │   ├── pages/                   # Route-level screens
│   │   │   ├── Landing.jsx
│   │   │   ├── auth/ (Login, Signup, ForgotPassword)
│   │   │   ├── verification/ (QRScan, Detail, History)
│   │   │   ├── dashboard/ (Overview, PrescriptionUpload)
│   │   │   ├── pharmacy/ (PharmacyLocator)
│   │   │   └── account/ (Profile, Settings)
│   │   ├── features/                # Redux Toolkit Slices
│   │   ├── hooks/                   # Custom React Hooks 
│   │   ├── services/                # API/Axios Services
│   │   ├── store/                   # Redux Store Configuration
│   │   ├── routes/                  # AppRoutes & Guards
│   │   ├── theme/                   # MUI & Tailwind Tokens
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── backend/                         # Node.js + Express Backend
    ├── src/
    │   ├── config/                  # DB & Env configuration
    │   ├── controllers/             # Request handling logic
    │   ├── models/                  # Mongoose Schemas
    │   ├── routes/                  # API Endpoint definitions
    │   ├── middlewares/             # Auth & Error middlewares
    │   ├── services/                # S3/Socket logic
    │   ├── utils/                   # Helper functions
    │   └── server.js                # App entry point
    ├── .env                         # Secrets
    └── package.json                 # Dependencies
```

---

## 🚀 Project Setup

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x` or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vedatrust.git
cd vedatrust
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://your-api-url.com/api
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_APP_NAME=Vedatrust
```

### 4. Run Development Server

```bash
npm run dev
```

App available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

### 7. Lint & Format

```bash
npm run lint       # Run ESLint
npm run format     # Run Prettier
```

---

## 🔌 API Integration

All API calls go through a centralized `axiosInstance.js`:

```js
// services/axiosInstance.js
import axios from 'axios';
import { storage } from '../utils/storage';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor — attaches auth token
axiosInstance.interceptors.request.use((config) => {
  const token = storage.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

---

## 🗃️ Redux Store Structure

```
store
├── auth          → { user, token, isAuthenticated, loading, error }
├── user          → { profile, preferences }
├── verification  → { scanResult, history, filters, loading }
├── pharmacy      → { list, selected, loading }
└── ui            → { theme, globalLoader, sidebarOpen }
```

---

## 🧩 Custom Hooks

| Hook | Purpose |
|------|---------|
| `useAuth` | Access auth state, login / logout / register actions |
| `useDebounce` | Debounce search and filter inputs |
| `useTheme` | Read and toggle light/dark mode |
| `useFetch` | Generic data fetching with loading & error state |
| `useLocalStorage` | Safe get/set with fallback if storage is unavailable |

---

## 💾 Storage Strategy

| Data | Storage | Reason |
|------|---------|--------|
| Auth token | `localStorage` | Persistent across sessions |
| Theme preference | `localStorage` | Persistent across sessions |
| User preferences | `localStorage` | Persistent across sessions |
| Prescription form progress | `sessionStorage` | Temporary, session only |
| Active search / filters | `sessionStorage` | Temporary, session only |

> ⚠️ All storage is cleared on logout. Sensitive data is never stored in plain text.

```js
// utils/storage.js — centralized storage helpers
export const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return null; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { console.warn('localStorage unavailable'); }
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
```

---

## ⚡ Performance Optimizations

- **Lazy loading** on all routes via `React.lazy` + `Suspense`
- **Code splitting** at the route level (separate chunks per page)
- `useMemo` for expensive computed values (filtered medicine lists, scan history aggregations)
- `useCallback` for stable event handler references
- **Virtualized lists** for large verification history tables
- **Image optimization** with `loading="lazy"` and proper `srcset`

---

## 🔍 SEO

- Dynamic page titles via `react-helmet-async`
- Meta descriptions per page
- Open Graph tags for social sharing
- `sitemap.xml` in `/public`
- Structured data (schema.org `MedicalWebPage`) for medicine detail pages

---

## 🌗 Theme System

- Light / Dark mode toggle in Settings page
- Preference persisted in `localStorage` via `useTheme` hook
- MUI `ThemeProvider` and Tailwind `dark:` classes kept in sync
- System preference detected and applied on first visit

---

## 🔔 Notifications System

- **React Hot Toast** for all action feedback
- Success: successful QR scan, prescription uploaded, login
- Error: failed verification, network error, validation failure
- Info: session expiry warnings, medicine safety alerts

---

## 📤 File Upload (Prescription)

- Drag & drop interface using native HTML5 + React state
- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.pdf`
- Max file size: 5MB
- Live file preview before submission
- Inline validation error feedback

---

## 📈 Analytics & Tracking

- Google Analytics GA4 integrated via `gtag`
- Page tracking on every route change
- Event tracking on: QR scan initiated/completed, prescription uploaded, pharmacy viewed, login/signup

---

## ♿ Accessibility (A11y)

- Semantic HTML throughout (`<main>`, `<nav>`, `<section>`, `<article>`)
- Full keyboard navigation support
- ARIA labels on all interactive elements
- Focus management in modals (trap focus, restore on close)
- WCAG AA color contrast compliant

---

## 🛡️ Error Handling

- `ErrorBoundary` component wraps the entire app to catch render errors
- Global error UI shown on unhandled network failures
- Per-component error states with a retry button
- Empty state UI for zero-result views (no scan history, no search results)

---

## 📋 Requirements Checklist

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Project Setup — Vite + Tailwind + MUI + Clean Structure | ✅ |
| 2 | Routing — Public, Protected, Role-based, Lazy loading, Route guards | ✅ |
| 3 | Redux Toolkit — Auth, User, Verification, UI slices | ✅ |
| 4 | API Integration — Axios + Request/Response Interceptors | ✅ |
| 5 | Forms & Validation — Formik + Yup + Multi-step Prescription Upload | ✅ |
| 6 | UI/UX — Responsive, Skeleton loaders, Empty & Error states | ✅ |
| 7 | Theme System — Light/Dark + localStorage persistence | ✅ |
| 8 | Performance — Lazy load, useMemo, useCallback, Virtualized lists | ✅ |
| 9 | SEO — React Helmet, OG tags, Sitemap, schema.org | ✅ |
| 10 | Accessibility — Semantic HTML, Keyboard nav, ARIA | ✅ |
| 11 | Error Handling — ErrorBoundary + Global error UI | ✅ |
| 12 | Custom Hooks — useAuth, useDebounce, useTheme, useFetch | ✅ |
| 13 | Notifications — Toast success/error/info system | ✅ |
| 14 | Real-Time Ready Structure — Socket integration structure planned | ✅ |
| 15 | File Upload — Drag & drop, preview, type/size validation | ✅ |
| 16 | Analytics — GA4 page + event tracking | ✅ |
| 17 | localStorage & sessionStorage strategy + helper utils | ✅ |
| 18 | Code Quality — ESLint + Prettier configured | ✅ |
| 19 | Documentation — This README | ✅ |





> *"Every medicine you receive should be as safe as the care behind it."*
