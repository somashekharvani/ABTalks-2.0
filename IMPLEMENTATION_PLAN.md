# ABTalks 2.0 — Implementation Plan

## Implementation Requirements

Implement this specification completely without requesting further clarification.

Make reasonable engineering decisions where implementation details are unspecified, while preserving the architecture, product philosophy, and feature scope described below.

Do not simplify or remove any required functionality.

---

## Folder Structure

```
e:/ABTalks/
 ├── app/
 │    ├── page.tsx                           # Landing Page (/)
 │    ├── dashboard/page.tsx                 # Dashboard (/dashboard)
 │    ├── day/[id]/page.tsx                  # Challenge Day (/day/12)
 │    └── api/
 │         ├── student/route.ts
 │         ├── dashboard/route.ts
 │         ├── tasks/[day]/route.ts
 │         ├── submissions/route.ts
 │         └── submissions/[day]/route.ts
 ├── components/
 │    ├── ui/
 │    ├── dashboard/
 │    ├── landing/
 │    └── challenge/
 ├── lib/
 │    ├── data.ts
 │    ├── streak-engine.ts
 │    ├── storage.ts
 │    ├── utils.ts
 │    └── tokens.ts
 ├── types/
 │    └── index.ts
 ├── data/
 │    ├── students.ts
 │    ├── tasks.ts
 │    ├── achievements.ts
 │    └── submissions.ts
 └── tests/
      └── streak-engine.test.ts
```

---

## Definition of Done

The implementation is complete only if all of the following are true:

- All three required routes exist (`/`, `/dashboard`, `/day/12`) and function correctly.
- All API route handlers return typed responses.
- Dashboard uses only `DashboardViewModel` data.
- No business logic exists inside React components.
- Streak Engine is implemented as a deterministic finite state machine.
- Optimistic submission flow works correctly.
- `localStorage` persistence works across refresh.
- All three fixtures render correctly.
- Unit tests pass.
- `npm run build` succeeds.
- No TypeScript errors.
- No console errors.
- Mobile experience is polished at 390px.
- Lighthouse scores exceed 95.

---

## Final Self Review

Before considering the project complete, perform a full engineering review.

Verify:
- Architecture follows the specification.
- UI matches the product philosophy.
- No duplicated business logic.
- No dead code.
- Components are reusable.
- Accessibility requirements are satisfied.
- Performance targets are achieved.
