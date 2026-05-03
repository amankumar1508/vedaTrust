# 💊 VedaTrust — Trust-First E-Pharmacy Verification Platform

> *"Verify Before You Trust"* — Empowering patients with transparent, verified, and safe online medicine procurement across India.

---

## 🔗 Important Links

* **Figma Link:** [View Figma Design](https://www.figma.com/design/zLuuG6BBavfyCUc7Kh075f/Untitled?node-id=0-1&t=8BUCxuZzby1jgyvB-1)
* **Live Deployed Project Link:** [https://veda-trust.vercel.app](https://veda-trust.vercel.app)
* **Postman Documentation Link:** [View API Docs](https://documenter.getpostman.com/view/50839281/2sBXqKofY6)
* **Backend Deployed Link:** [Add your Render/Heroku link here]
* **YouTube Demo Link:** [Watch Demo on YouTube](https://www.youtube.com/watch?v=YwqLpWclAM8)

---

## 📌 Problem Statement

**Domain:** HealthTech / E-Pharmacy

Patients across India — especially chronic patients, elderly individuals, and those in smaller towns — hesitate or avoid buying essential medicines on e-pharmacy platforms because there is **no reliable way to instantly verify drug authenticity, expiry, batch legitimacy, or proper storage conditions** before or after delivery.

Existing platforms lack:
- ❌ Mandatory prescription verification
- ❌ Holographic or QR-based batch verification
- ❌ Transparent sourcing and supply chain visibility

This exposes buyers to **counterfeit, substandard, or expired drugs** that can cause treatment failure, severe side effects, or even life-threatening complications.

---

## ✅ Solution

**VedaTrust** introduces a trust-first verification system acting as an immutable ledger and a verification engine that allows users to:

- 📱 **Scan medicines** using QR codes for instant authenticity checks.
- 📜 **Upload and validate prescriptions** through a secure multi-step flow.
- 🏪 **Purchase from verified pharmacies only** — every listed pharmacy is licensed and vetted.
- 🧾 **View detailed medicine information** with trust indicators and supply chain audits.

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| 🔍 **QR-Based Verification** | Scan medicine QR → view authenticity, batch, expiry, manufacturer. |
| 📤 **Prescription Upload** | Secure form with file handling for digitizing physical prescriptions. |
| 🏪 **Verified Pharmacy Locator** | Map system to find nearby licensed pharmacies with "Verified" badges. |
| 📊 **Patient Dashboard** | Bird's-eye view of total scans, verified medicines, and recent activity. |
| 🧾 **Scan History** | Audit log tracking every verified medicine to prevent fraud. |
| 🔒 **Secure Authentication** | JWT-based login and signup with password encryption. |

---

## 🛠️ Tech Stack

**Frontend:**
- **Build Tool:** Vite
- **Framework:** React 18
- **Styling:** Tailwind CSS + MUI (Material UI)
- **Routing:** React Router v6
- **Forms & Validation:** Formik + Yup
- **HTTP Client:** Axios

**Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB / Mongoose
- **File Uploads:** Multer
- **Security:** JWT, Bcrypt.js, CORS

---

## 📁 Proper Folder Structure

```
vedaTrust/
├── frontend/                        # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/              # UI Components (auth, layout, landing)
│   │   ├── pages/                   # Route-level screens (Dashboard, Locator)
│   │   ├── services/                # API/Axios configuration
│   │   ├── theme/                   # Tailwind configuration utilities
│   │   ├── App.jsx                  # Main App Component
│   │   └── main.jsx                 # React Entry Point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── backend/                         # Node.js + Express Backend
    ├── src/
    │   ├── config/                  # DB connection configs
    │   ├── controllers/             # Business Logic (auth, verify, prescription)
    │   ├── models/                  # Mongoose Schemas
    │   ├── routes/                  # API Endpoints
    │   ├── middlewares/             # Auth, Error, & Upload handlers
    │   ├── utils/                   # Helpers (logger, crypto)
    │   └── server.js                # App entry point
    ├── .env                         # Environment variables
    └── package.json                 # Dependencies
```

---



---

## 🚀 Project Setup Instructions

1. **Clone the repo:** `git clone <repository_url>`
2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file based on configurations
   npm run dev
   ```
3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Access the app at `http://localhost:5173`.
