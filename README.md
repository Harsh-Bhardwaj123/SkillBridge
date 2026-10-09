# 🎓 SkillBridge – Intelligent Skill Learning & Certification Platform

> **Applied AI and Prototype Development College Project**  
> An enterprise-grade, full-stack educational SaaS platform that harnesses Google Gemini AI to analyze learner aspirations, deliver personalized 5-module skill roadmaps, evaluate knowledge via smart assessments, and generate cryptographically verifiable digital certificates.

---

## 🌟 Executive Summary & Workflow

SkillBridge bridges the gap between raw student aspirations and industry-demanded competencies through an intelligent, automated end-to-end pipeline:

```
User Registration/Login
        ↓
Enter Interests + Career Goals
        ↓
AI Skill Recommendation (Google Gemini LLM)
        ↓
Explain Why Skill Was Recommended & Career Relevance
        ↓
Select Skill & Inspect 5-Module Syllabus
        ↓
Structured Interactive Learning Studio & Resources
        ↓
Quiz & Knowledge Assessment (Min 70% threshold)
        ↓
Track Progress (Real-Time Lesson & Quiz Tracking)
        ↓
Complete Required Graduation Criteria (70%+ Progress + Quiz)
        ↓
Generate Official Digital PDF Certificate (ID: SB-XXXX-XXXX)
        ↓
Public Verification Portal (/verify/:certificateId)
```

---

## 🛠️ Tech Stack Architecture

### Frontend
- **React 18** with **TypeScript** for rock-solid type safety
- **Vite 6** for blazing-fast bundling and Hot Module Replacement
- **Tailwind CSS** with a modern Framer Clean Teal aesthetic (`#f4f8f7`, `#142a2b`, `#007f70`, `#647878`, `#e2ece9`, rounded cards and pills)
- **Lucide React** icons for modern iconography
- **Canvas Confetti** for delightful graduation celebrations
- **jsPDF & html2canvas** for instant client-side PDF certificate compilation

### Backend API
- **Node.js** & **Express** server (`/server/index.ts`)
- **Google Generative AI SDK** (`@google/generative-ai`) invoking Gemini models (`gemini-1.5-flash`)
- **Strict JSON schema output enforcement** with automated validation
- **Fail-safe fallback engine** ensuring zero UI crashes or blank screens if external APIs are unreachable

### Database & Authentication
- **Supabase PostgreSQL** with automated table provisioning
- **Row Level Security (RLS)** ensuring users only manipulate their own records
- **Supabase Auth** (email/password, password reset)
- **Zero-Dependency Demo Mode**: Automatic local persistence in `localStorage` when credentials are not yet configured!

---

## 📂 Project Directory Structure

```
SkillBridge/
├── dist/                     # Optimized production bundle
├── public/                   # Static browser assets
├── server/
│   └── index.ts              # Express API server with Gemini AI routes
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CertificateView.tsx # Printable/downloadable PDF certificate
│   │   ├── DemoBadge.tsx     # Demo Mode & Supabase status indicator
│   │   ├── Navbar.tsx        # Responsive navigation bar with mobile drawer
│   │   └── Sidebar.tsx       # Student dashboard navigation drawer
│   ├── context/
│   │   ├── AuthContext.tsx   # Auth state (Supabase + Demo 1-click login)
│   │   └── LearningContext.tsx # Progress, lesson toggles, quizzes, certificates
│   ├── data/
│   │   └── coursesData.ts    # Complete 5-module courses, lessons & quizzes
│   ├── pages/
│   │   ├── AssessmentsPage.tsx     # All module quizzes & retake hub
│   │   ├── CertificateDetailPage.tsx # Dedicated certificate document viewer
│   │   ├── CertificatesPage.tsx    # Certificates gallery & claim cards
│   │   ├── DashboardPage.tsx       # Student learning dashboard
│   │   ├── ForgotPasswordPage.tsx  # Account recovery flow
│   │   ├── LandingPage.tsx         # High-converting SaaS landing page
│   │   ├── LearnCoursePage.tsx     # Interactive learning workspace
│   │   ├── LoginPage.tsx           # Authentication sign-in
│   │   ├── OnboardingPage.tsx      # AI profile calibration (interests & goals)
│   │   ├── ProfilePage.tsx         # Account preferences & goal editing
│   │   ├── QuizPage.tsx            # Multiple-choice exam runner & explanations
│   │   ├── RecommendationsPage.tsx # Gemini AI recommendations & match cards
│   │   ├── RegisterPage.tsx        # New student account signup
│   │   ├── ResetPasswordPage.tsx   # Password update form
│   │   ├── SkillDetailsPage.tsx    # 5-Module syllabus & career opportunities
│   │   └── VerifyCertificatePage.tsx # Public credential verification portal
│   ├── services/
│   │   ├── aiService.ts      # Backend / Client AI recommendation caller
│   │   └── supabase.ts       # Supabase client initializer & config detection
│   ├── types/
│   │   └── index.ts          # Central TypeScript interfaces and data models
│   ├── App.tsx               # Route declarations (16 routes + route guards)
│   ├── index.css             # Tailwind base & glassmorphism utilities
│   ├── main.tsx              # React DOM bootstrap
│   └── vite-env.d.ts         # Environment variable typing
├── supabase/
│   └── schema.sql            # Full PostgreSQL DDL schema & RLS policies
├── .env.example              # Template environment variables
├── .env                      # Local environment configuration
├── package.json              # Unified monorepo scripts & dependencies
├── tailwind.config.js        # Custom theme colors and glow shadows
├── tsconfig.json             # TypeScript compiler settings
└── vite.config.ts            # Vite bundler & backend /api reverse proxy
```

---

## ⚡ Quick Start (Demonstration in 2 Steps)

SkillBridge includes **Demo Mode out-of-the-box**. Even if you have not configured Supabase or Gemini API keys, the entire application is 100% functional immediately!

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development
```bash
npm run dev
```

The application will launch with:
- **Express Backend API** running on `http://localhost:5000`
- **Vite React Frontend** running on `http://localhost:5173`

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Environment Variables Configuration

To enable live Google Gemini AI calls and real Supabase PostgreSQL persistence, create or edit the `.env` file in the project root:

```ini
# Google Gemini API Key
# Obtain a free key from: https://aistudio.google.com/
GEMINI_API_KEY=AIzaSy...

# Supabase Authentication & Database
# Create a free project at: https://supabase.com/
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Backend Port (Default 5000)
PORT=5000
```

> **Note on Security:**  
> The `GEMINI_API_KEY` is exclusively consumed on the Node.js backend (`server/index.ts`) and is **never** bundled or exposed to client-side code.

---

## 🗄️ Database Setup (Supabase)

If you wish to use Supabase instead of local storage:

1. Create a new free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Open the file `supabase/schema.sql` from this repository.
4. Paste the entire SQL script into the editor and click **Run**.
5. Copy your **Project URL** and **anon public key** from `Project Settings -> API` into `.env`.
6. Restart your dev server (`npm run dev`). The `Supabase Live` badge will appear automatically!

---

## 🚀 Live Demo Mode Walkthrough

When presenting or grading this project without credentials:

1. Click **"Instant Demo Mode"** on the Landing Page or Login page.
2. You will be authenticated as student **Alex Morgan**.
3. Visit **AI Calibration** (`/onboarding`) to select interests like *Data Science*, *AI & Machine Learning*, and *Career Switch*.
4. View the **AI Recommendations** (`/recommendations`) generated with match scores and custom career relevance explanations.
5. Click **"Start Learning"** on *Python for Data Science* to open the **Learning Studio** (`/learn/python-data-science`).
6. Check off lessons and take the **Module 1 Quiz** (`/quiz/quiz-pds-m1`). Answer all 3 questions and see real-time score feedback and explanations.
7. Click **"Claim Certificate"** upon reaching 70%+ mastery.
8. Inspect the official **Certificate of Completion** with its gold seal, unique ID, and click **"Download PDF"** to save a printable vector PDF!
9. Copy the verification ID and open `/verify/SB-2026-X892B` to demonstrate the **Public Certificate Verification Portal**.

---

## 🧪 Build and Quality Checks

To verify type safety and bundle size:

```bash
# TypeScript compilation check & production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛡️ Applied AI & Security Practices

- **Strict Schema Enforcement:** Gemini prompt instructs strict JSON generation. Incoming model tokens are sanitized to strip markdown formatting and validate object schemas before transmitting to the client.
- **Fail-Safe Circuit Breaker:** If Gemini times out, experiences rate limits, or network interruptions occur, the internal deterministic AI engine takes over transparently.
- **Data Protection:** Zero plain passwords stored. Client tokens use Supabase JWT with Row-Level Security policies restricting updates to `auth.uid() = user_id`.
