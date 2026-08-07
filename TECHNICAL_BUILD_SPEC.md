# ABTalks 2.0 — Technical Build Specification

## Tagline
**Built for Consistency**

## Core Philosophy
Students don't fail because they lack skill — they fail because they lose momentum.
Design and build a production-quality redesign of ABTalks that is technically engineered, visually polished, and mobile-first.

---

## Technology Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Mobile-first (390px default / responsive desktop)
- Dark mode by default
- Next.js Route Handlers
- Typed mock data
- localStorage persistence
- Deployable on Vercel (No backend database)

---

## Required Routes
- `/` — Landing Page
- `/dashboard` — Consistency Dashboard
- `/day/12` — Challenge Day Route

---

## High-Level Architecture
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

Business logic must never live inside React components.

---

## Streak Engine FSM Transition Rules
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
All streak logic belongs inside `lib/streak-engine.ts`.
