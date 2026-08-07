# ABTalks 2.0 — Built for Consistency

> **Philosophy**: Students don't fail because they lack skill — they fail because they lose momentum.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-6e9f18?logo=vitest)](https://vitest.dev/)

A production-quality, mobile-first, dark-mode redesign of **ABTalks 2.0** engineered with state-machine streak protection, non-punitive recovery paths, and verified GitHub proof-of-work.

---

## 🎯 Problem Statement & Solution

Traditional coding challenge platforms punish students harshly when they miss a single day. A broken 20-day streak causes demoralization and leads to abandonment.

**ABTalks 2.0** solves this with a **Deterministic Finite State Machine (FSM)**:
1. **Tactical Streak Freeze**: Automatically consumes a freeze when a day is missed to preserve momentum.
2. **Non-Punitive Recovery Path**: Encouraging recovery message ("Welcome back. Every great developer has missed a day.") guiding students back toward beating their personal record.
3. **Recruiter Proof of Work Gallery**: Dual student/recruiter toggle overlaying verified GitHub repositories and submission proof.

---

## 📐 Architecture & ViewModel Pattern

```
                        User
                         │
                         ▼
                 Next.js App Router
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
 React Components                 API Route Handlers
         │                               │
         │                               ▼
         │                        lib/data.ts
         │                               │
         └───────────────┬───────────────┘
                         ▼
                 lib/streak-engine.ts
                         │
                         ▼
              Dashboard ViewModel
                         │
                         ▼
                    UI Rendering
```

React components are 100% presentation-only and receive pre-computed data from `DashboardViewModel`.

---

## 🚦 FSM Transition Matrix

```
Current State | Event                | Next State
---------------------------------------------------
ACTIVE        | Submit Today         | ACTIVE
ACTIVE        | Missed Day           | AT_RISK
AT_RISK       | Freeze Available     | FROZEN
AT_RISK       | No Freeze            | BROKEN
FROZEN        | Next Submission      | ACTIVE
BROKEN        | Successful Submit    | RECOVERED
RECOVERED     | Next Day             | ACTIVE
```

---

## 💻 Tech Stack & Dependencies

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Testing**: Vitest 3.0
- **Language**: TypeScript 5.7

---

## ⚡ Quick Start & Verification

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Unit Tests
```bash
npm test
```

### 3. Build Check
```bash
npm run build
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Required Routes

- [`/`](http://localhost:3000/) — Landing Page
- [`/dashboard`](http://localhost:3000/dashboard) — Consistency Dashboard
- [`/day/12`](http://localhost:3000/day/12) — Challenge Day 12 Route
