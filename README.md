# ABTalks 2.0 — Built for Consistency

> **"Your streak is a number. Your projects are proof."**

ABTalks 2.0 is a mobile-first developer consistency platform designed to help students maintain momentum throughout a daily coding challenge.

![ABTalks 2.0 Landing Page](https://raw.githubusercontent.com/somashekharvani/ABTalks-2.0/main/public/assets/images/landing_page.png)

Instead of treating a missed day as the end of progress, ABTalks uses a **deterministic Finite State Machine (FSM)** to model consistency, protect streaks through Tactical Shields, and provide a non-punitive Recovery Path when a streak is broken.

The platform combines:

* Deterministic FSM-based streak management
* Tactical Streak Freeze
* Recovery Mode
* Optimistic UI
* Failure rollback
* TaskFlow daily development
* Interactive 60-day heatmap
* Time Machine snapshots
* Day Inspector
* Journey Timeline
* Momentum Score
* Consistency DNA
* Activity/Audit Trail
* Recruiter Preview
* Evaluator FSM Playground
* Architecture specification viewer
* LocalStorage persistence
* Mobile-first responsive UI

---

# 🎯 Problem

Students often don't stop learning because they lack technical ability.

They stop because they lose **momentum**.

A traditional daily coding challenge usually reduces progress to a simple question:

> "Did you submit today?"

That approach doesn't explain:

* Why a student's streak changed
* What happened when a day was missed
* Whether a streak could be protected
* How the student recovered
* What technical work was actually completed
* How the student's consistency can be demonstrated to recruiters

ABTalks 2.0 treats consistency as a **stateful engineering problem** rather than a single counter.

---

# 💡 Solution

ABTalks 2.0 models the developer journey as:

```text
LEARN
  ↓
BUILD
  ↓
SUBMIT
  ↓
PROVE
  ↓
MAINTAIN CONSISTENCY
  ↓
RECOVER WHEN NECESSARY
  ↓
SHOWCASE PROGRESS
```

![Learning → Assessment → Project Flow](https://raw.githubusercontent.com/somashekharvani/ABTalks-2.0/main/public/assets/images/learning_project_flow.png)

The core of the platform is a deterministic consistency engine.

```text
ACTIVE
   ↓
AT_RISK
   ↓
 ┌───────────────┐
 ↓               ↓
FROZEN         BROKEN
 ↓               ↓
 └───────┐   RECOVERED
         ↓       ↓
       ACTIVE ←──┘
```

The UI renders the state, while the **pure TypeScript FSM owns the transition logic**.

---

# 🧠 Core Technical Architecture

```text
                    ABTalks 2.0
                         │
                         ▼
                  TaskFlow UI
                         │
                         ▼
                  Optimistic UI
                         │
                         ▼
              ┌───────────────────┐
              │  Pure TypeScript  │
              │    FSM Engine     │
              └─────────┬─────────┘
                        │
             State + Event + Guard
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
        Audit Trail           Persistence
                                  │
                             LocalStorage
```

### Architecture principle

> **React renders the UI state; the pure TypeScript FSM owns the transition logic.**

This keeps business logic independent from React components and makes the state machine deterministic and testable.

---

# ⚙️ Technology Stack

| Technology             | Purpose                          |
| ---------------------- | -------------------------------- |
| Next.js 15             | Application framework            |
| React 19               | UI                               |
| TypeScript             | Type safety + FSM implementation |
| Tailwind CSS v4        | Styling                          |
| Vitest                 | Unit testing                     |
| LocalStorage           | Client-side persistence          |
| Next.js Route Handlers | API layer                        |

---

# 🚦 Deterministic FSM

The consistency engine contains five primary states:

| State       | Meaning                                            |
| ----------- | -------------------------------------------------- |
| `ACTIVE`    | Student is maintaining their challenge             |
| `AT_RISK`   | Submission window is approaching/missed-risk state |
| `FROZEN`    | Tactical Shield has protected the streak           |
| `BROKEN`    | Streak has been broken                             |
| `RECOVERED` | Student has successfully completed recovery        |

## Transition rules

| Current State | Event           | Guard            | Next State |
| ------------- | --------------- | ---------------- | ---------- |
| ACTIVE        | SUBMIT          | Valid submission | ACTIVE     |
| ACTIVE        | WINDOW_WARNING  | —                | AT_RISK    |
| AT_RISK       | SUBMIT          | Valid submission | ACTIVE     |
| AT_RISK       | DAY_MISSED      | Freeze available | FROZEN     |
| AT_RISK       | DAY_MISSED      | No freeze        | BROKEN     |
| FROZEN        | SUBMIT          | Valid submission | ACTIVE     |
| BROKEN        | RECOVERY_SUBMIT | Valid recovery   | RECOVERED  |
| RECOVERED     | NEXT_SUCCESS    | Valid submission | ACTIVE     |

The transition engine is deterministic:

```text
Same State + Same Event + Same Conditions = Same Result
```

---

# ❄️ Tactical Shield / Streak Freeze

When a student misses a challenge day, the system checks whether a Tactical Shield is available.

```text
AT_RISK
   ↓
DAY_MISSED
   ↓
Freeze available?
   ├── YES → FROZEN
   └── NO  → BROKEN
```

When a freeze is consumed:

* The streak is protected.
* Freeze inventory is reduced.
* The heatmap records the frozen day.
* The audit trail records the transition.
* The dashboard explains why the state changed.

---

# 🔥 Recovery Mode

A broken streak should not mean that the student's work has disappeared.

When:

```text
AT_RISK
   ↓
No freeze available
   ↓
BROKEN
```

the platform activates Recovery Mode.

The student receives a new recovery goal based on their previous personal best.

Example:

```text
Previous Best: 18 days
Current Streak: 0

Recovery Goal:
Beat your previous record.
```

The recovery flow:

```text
BROKEN ➔ RECOVERY SUBMISSION ➔ RECOVERED ➔ NEXT SUCCESS ➔ ACTIVE
```

The philosophy is:

> **Your streak can break. Your progress doesn't have to.**

---

# ⚡ Optimistic UI

Challenge submissions use an optimistic interaction model.

```text
User submits ➔ UI updates immediately ➔ Request validation ➔ Confirmation
```

If the operation fails:

```text
Optimistic update ➔ Request fails ➔ Rollback ➔ Previous state restored ➔ Actionable error shown
```

This prevents the interface from feeling slow while still maintaining a safe recovery path when validation fails.

---

# 🛡️ State Guards & Invalid Transitions

The FSM doesn't blindly accept every event.

For example:

```text
BROKEN + NORMAL_SUBMISSION = INVALID TRANSITION
```

The student must use the recovery path. This keeps the state machine predictable and prevents inconsistent states.

---

# 🧪 Evaluator FSM Playground

The project includes an evaluator-facing FSM Playground with five scenarios.

### Scenario 1 — Normal Submission (`ACTIVE → ACTIVE`)
### Scenario 2 — Window Warning (`ACTIVE → AT_RISK`)
### Scenario 3 — Tactical Shield (`AT_RISK → FROZEN`)
### Scenario 4 — No Shield Left (`AT_RISK → BROKEN`)
### Scenario 5 — Recovery Verification (`BROKEN → RECOVERED`)

The project also provides a **"RUN ALL 5 SCENARIOS"** button to execute the transitions together with output:

```text
5 / 5 transition scenarios passed (100% Pass Rate) ⭐
```

![FSM Architecture & Playground Visualizer](https://raw.githubusercontent.com/somashekharvani/ABTalks-2.0/main/public/assets/images/fsm_architecture_playground.png)

---

# 📐 Architecture Specification

The project includes an evaluator-facing architecture viewer (`<ArchitectureModal />`).

It explains the complete flow:

```text
TaskFlow UI ➔ Optimistic UI ➔ Pure TypeScript FSM ➔ Audit Trail ➔ LocalStorage
```

It exposes FSM states, events, guards, transition rules, engineering philosophy, and state-management flow without requiring a judge to search through the source code.

---

# 📊 Dashboard & 🔎 Day Inspector

The dashboard provides a complete view of the student's challenge journey with a 60-day interactive heatmap. Selecting any day allows inspecting:
- **Learning**: Topic, difficulty, duration
- **Build**: TaskFlow milestone & code snippet
- **Proof**: Verified GitHub repository & LinkedIn post link
- **Consistency**: Streak, state, freeze/recovery details

![Consistency Dashboard](https://raw.githubusercontent.com/somashekharvani/ABTalks-2.0/main/public/assets/images/consistency_dashboard.png)

---

# 🕐 Time Machine

Time Machine mode allows the dashboard to be viewed at previous challenge points (`Day 1`, `Day 5`, `Day 10`, `Day 12`), updating streak, state, heatmap, and momentum dynamically.

---

# 📈 Momentum Score & 🧬 Consistency DNA

Summarizes consistency beyond raw streak numbers with a 0-100 score and calculates behavioral profiles (Discipline, Velocity, Focus, Recovery Capacity, Reliability).

---

# 👨💻 TaskFlow & 👔 Recruiter Preview

The Day 12 challenge is built around TaskFlow Task Manager, providing a recruiter-oriented view with verified engineering evidence behind the `94/100` Reputation Score.

![Recruiter Proof Profile](https://raw.githubusercontent.com/somashekharvani/ABTalks-2.0/main/public/assets/images/recruiter_proof_profile.png)

---

# 👥 Demo Fixtures

- **Student A (Fresh Start)**: Day 1, `ACTIVE` state
- **Student B (Tactical Shield)**: Day 12, `FROZEN` state (Freeze shield consumed)
- **Student C (Recovery)**: Day 12, `BROKEN` state (Recovery Path active)

---

# 🧪 Testing & Current Verification

```text
✓ 8 / 8 Vitest tests passing
✓ 0 TypeScript errors
✓ Production build successful
✓ Student A fixture verified
✓ Student B fixture verified
✓ Student C fixture verified
✓ Optimistic submission & rollback flow verified
✓ PROMPTS.md included
```

---

# 📱 Mobile-First Design & ♿ Accessibility

Engineered mobile-first targeting **390px** viewport with 44px touch targets, dark-mode first design, ARIA landmark accessibility, and visible focus states.

---

# 🚀 Getting Started

## 1. Install Dependencies
```bash
npm install
```

## 2. Run Tests
```bash
npm test
```

## 3. TypeScript Type Safety Check
```bash
npx tsc --noEmit
```

## 4. Production Build
```bash
npm run build
```

## 5. Start Local Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

# 🔗 Demo Links

- **Live Production App (Vercel)**: [https://ab-talks-2-0.vercel.app](https://ab-talks-2-0.vercel.app)
- **Live Dashboard Route**: [https://ab-talks-2-0.vercel.app/dashboard](https://ab-talks-2-0.vercel.app/dashboard)
- **Live Day 12 Challenge Route**: [https://ab-talks-2-0.vercel.app/day/12](https://ab-talks-2-0.vercel.app/day/12)
- **GitHub Repository**: [https://github.com/somashekharvani/ABTalks-2.0](https://github.com/somashekharvani/ABTalks-2.0)
- **AI Usage Log**: [PROMPTS.md](https://github.com/somashekharvani/ABTalks-2.0/blob/main/PROMPTS.md)

---

# 🔮 Future Roadmap

Potential future extensions include:
* Expanded multi-track learning paths
* Real-time WebSocket peer activity streams
* Automated GitHub Webhook submission triggers
* Enterprise recruiter candidate matching APIs

---

> **ABTalks 2.0 — Built for Consistency.**
