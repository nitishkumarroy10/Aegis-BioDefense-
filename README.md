# Aegis BioDefense Platform 🛡️

**Aegis BioDefense** is an enterprise-grade bio-defense, pest control, and property health management system serving residential, commercial, industrial, and government facilities across Delhi NCR. Powered by Google Gemini AI, Firebase Firestore, and high-performance full-stack Node.js + Express architecture.

---

## 🚀 Key Features

- **Google Gemini AI Diagnostic Suite**: Instant AI pest threat identification and risk calculation powered by `@google/genai` (Gemini 3.6 Flash).
- **Interactive Property Health Dashboard**: Live environmental risk telemetry, acoustic sensor monitoring, and treatment schedule tracking.
- **Dynamic Service & Cost Calculator**: Instant quote estimation with currency conversion (INR, USD, EUR, GBP, AED).
- **24/7 AI Emergency Dispatch**: Interactive AI chat assistant with grounding sources and instant dispatch booking.
- **Enterprise Operations Portal**: Secure dispatch management, field unit telemetry, and service log tracking with Firebase Firestore synchronization.
- **PWA & Offline Capability**: Progressive Web App with service worker caching and offline fallback.
- **WCAG 2.2 AA Accessibility & SEO Optimized**: Pre-rendered metadata, OpenGraph cards, structured JSON-LD schemas, sitemap, and keyboard navigation.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Motion (Framer Motion)
- **Backend**: Express.js, TypeScript, Google GenAI SDK (`@google/genai`), dotenv
- **Database & Auth**: Firebase Firestore & Firebase Auth
- **Icons & UI**: Lucide React, HTML5 Canvas
- **Deployment**: Vercel, Google Cloud Run, Firebase Hosting, Netlify

---

## ⚙️ Quick Start

### Prerequisites
- Node.js 18+ or 22+
- npm / yarn / pnpm / bun

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env` and insert your Gemini API key:
```bash
cp .env.example .env
```

`.env` configuration:
```env
GEMINI_API_KEY="your_actual_gemini_api_key"
APP_URL="http://localhost:3000"
```

> **Note**: Obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Development
Start the full-stack Express + Vite development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Test
```bash
npm run build
npm start
```

### 5. Lint & Type Check
```bash
npm run lint
```

---

## 🚢 Deployment

### Deploy to Vercel
1. Push project to GitHub.
2. Import project into Vercel.
3. Add environment variable `GEMINI_API_KEY` in Vercel project settings.
4. Deploy! (`vercel.json` is pre-configured).

### Deploy with Docker / Cloud Run
```bash
docker build -t aegis-biodefense .
docker run -p 3000:3000 -e GEMINI_API_KEY="your_api_key" aegis-biodefense
```

---

## 🔒 Security & Privacy

- All API calls to Google Gemini AI are executed server-side to keep API keys strictly confidential.
- Firestore Security Rules enforce document isolation and strict field validation.
- Input sanitization and error bounds protect against XSS and unhandled runtime exceptions.

---

## 📜 License

MIT License © Aegis BioDefense Systems. All rights reserved.
