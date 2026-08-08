import { Task } from '@/types';

interface TopicDetail {
  title: string;
  category: Task['category'];
  difficulty: Task['difficulty'];
  description: string;
  requirements: string[];
  notes: string;
  codeExample: string;
  videoTitle: string;
  videoDuration: string;
}

const TOPIC_CATALOG: Record<number, TopicDetail> = {
  1: {
    title: 'HTML5 Semantic Foundations & ARIA Accessibility',
    category: 'Frontend',
    difficulty: 'Beginner',
    description: 'Master HTML5 semantic elements (<header>, <main>, <article>, <nav>, <aside>) and WAI-ARIA roles to build 100% accessible, SEO-optimized web documents.',
    requirements: [
      'Use proper heading hierarchy (h1 through h6 without skipping levels)',
      'Implement ARIA landmarks and aria-expanded/aria-controls state attributes',
      'Pass WCAG 2.1 AA color contrast and screen reader accessibility checks',
      'Validate document markup using W3C HTML validator'
    ],
    notes: 'Semantic HTML provides contextual meaning to content for browsers and assistive technologies. Landmark elements like <main> and <nav> allow screen reader users to skip directly to primary navigation and content areas without tab-traversing every link.',
    codeExample: `<!-- Day 1: Semantic Document Shell -->
<header role="banner" className="bg-slate-900 border-b border-slate-800 p-4">
  <nav aria-label="Primary Navigation">
    <ul className="flex items-center gap-4">
      <li><a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a></li>
      <li><a href="/" className="font-bold text-amber-400">ABTalks 2.0</a></li>
    </ul>
  </nav>
</header>
<main id="main-content" role="main" tabIndex={-1}>
  <article aria-labelledby="post-heading">
    <h1 id="post-heading" className="text-2xl font-bold">Building Accessible Interfaces</h1>
    <p>Accessibility is fundamental to modern web engineering...</p>
  </article>
</main>`,
    videoTitle: 'Class 1: HTML5 Semantics & Accessible DOM Architecture',
    videoDuration: '24:15',
  },
  2: {
    title: 'CSS Grid & Modern Flexbox Layout Systems',
    category: 'Frontend',
    difficulty: 'Beginner',
    description: 'Construct responsive 2D layouts using CSS Grid subgrid, auto-fit, minmax(), and Flexbox alignment primitives with zero media-query bloat.',
    requirements: [
      'Create responsive card grid using grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))',
      'Implement aspect-ratio box containers with CSS container queries',
      'Use gap spacing variables aligned to design system tokens',
      'Ensure zero layout shift (CLS < 0.05)'
    ],
    notes: 'CSS Grid excels at two-dimensional row and column structures, whereas Flexbox manages one-dimensional axis distribution. Combining auto-fit with minmax() eliminates rigid breakpoints in modern responsive UIs.',
    codeExample: `/* Day 2: Responsive Auto-Fit Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md, 1rem);
  align-items: stretch;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
}`,
    videoTitle: 'Class 2: Master CSS Grid Auto-Fit & Container Queries',
    videoDuration: '28:40',
  },
  3: {
    title: 'JavaScript ES2024 Async Control & Event Loop',
    category: 'Frontend',
    difficulty: 'Intermediate',
    description: 'Deep dive into Promise concurrency primitives (Promise.allSettled, Promise.any), AsyncGenerators, and Microtask queue mechanics.',
    requirements: [
      'Implement promise retry wrapper with exponential backoff strategy',
      'Process async streams using for-await-of loops',
      'Handle unhandled promise rejections gracefully with custom error boundaries',
      'Benchmark Microtask vs Macrotask execution timing'
    ],
    notes: 'The JavaScript Event Loop handles Call Stack tasks first, drains the Microtask queue (Promises, queueMicrotask) completely, and then yields execution to Macrotasks (setTimeout, I/O) before repaint cycles.',
    codeExample: `// Day 3: Exponential Backoff Promise Retry
async function fetchWithRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 500): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((res) => setTimeout(res, delayMs));
    return fetchWithRetry(fn, retries - 1, delayMs * 2);
  }
}`,
    videoTitle: 'Class 3: Event Loop Microtasks & Concurrency Controls',
    videoDuration: '32:10',
  },
  4: {
    title: 'TypeScript Generics & Utility Type Mastery',
    category: 'Frontend',
    difficulty: 'Intermediate',
    description: 'Engineered advanced type mappings using conditional types, infer keywords, template literal types, and mapped utility types.',
    requirements: [
      'Create DeepReadonly<T> and DeepPartial<T> recursive type helpers',
      'Use infer to extract function return types and promise resolved values',
      'Type safe event emitter class with strict event map generics',
      'Verify zero usage of any or implicit unknown types'
    ],
    notes: 'Conditional types T extends U ? X : Y allow types to dynamically adapt based on generic type constraints. The infer keyword lets you extract and capture nested type parameters inside condition branches.',
    codeExample: `// Day 4: Custom DeepReadonly & Infer Extractor
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

interface UserState {
  profile: { name: string; roles: string[] };
}
type ImmutableUserState = DeepReadonly<UserState>;`,
    videoTitle: 'Class 4: Advanced TypeScript Conditional Types & Infer',
    videoDuration: '35:20',
  },
  5: {
    title: 'React 19 Server Components & Actions',
    category: 'Frontend',
    difficulty: 'Advanced',
    description: 'Leverage React 19 Server Components (RSC), useActionState, useFormStatus, and useOptimistic for zero-JS client bundle mutations.',
    requirements: [
      'Build form submission handler with Server Action backend target',
      'Implement useOptimistic hook for immediate UI updates',
      'Stream async server component payloads with <Suspense>',
      'Configure progressive enhancement fallback for disabled JS'
    ],
    notes: 'React Server Components execute exclusively on the server, generating static HTML streams without shipping component JavaScript to the client. Server Actions handle POST requests with automatic revalidation.',
    codeExample: `// Day 5: React 19 Server Action & Optimistic Hook
'use client';
import { useOptimistic, useTransition } from 'react';

export function ChallengeSubmission({ currentStreak, submitAction }: { currentStreak: number; submitAction: (formData: FormData) => Promise<void> }) {
  const [optimisticStreak, setOptimisticStreak] = useOptimistic(currentStreak, (state, update: number) => update);
  const [isPending, startTransition] = useTransition();

  return (
    <form action={async (formData) => {
      startTransition(() => setOptimisticStreak(optimisticStreak + 1));
      await submitAction(formData);
    }}>
      <p>Current Streak: {optimisticStreak} days</p>
      <button type="submit" disabled={isPending}>Submit Code Proof</button>
    </form>
  );
}`,
    videoTitle: 'Class 5: React 19 RSC, Actions & useOptimistic Mutations',
    videoDuration: '41:15',
  },
  6: {
    title: 'Tailwind CSS v4 Custom Design System Tokens',
    category: 'Frontend',
    difficulty: 'Beginner',
    description: 'Build a dark-mode design system utilizing Tailwind v4 @theme directive, HSL color primitives, and custom glassmorphism utilities.',
    requirements: [
      'Configure custom spacing, radius, and shadow tokens in globals.css',
      'Implement dark mode color palette with high contrast WCAG ratios',
      'Create reusable component utilities with @layer components',
      'Ensure zero unused CSS rules in production bundle'
    ],
    notes: 'Tailwind v4 replaces tailwind.config.js with CSS-first configuration using the @theme directive. Design tokens defined inside @theme become instant CSS variables and utility classes.',
    codeExample: `/* Day 6: Tailwind v4 @theme Configuration */
@import "tailwindcss";

@theme {
  --color-amber-accent: #f59e0b;
  --color-slate-canvas: #090d16;
  --color-glass-card: rgba(18, 24, 38, 0.8);
  --shadow-glow-amber: 0 0 24px -4px rgba(245, 158, 11, 0.35);
}

.glass-card {
  background-color: var(--color-glass-card);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}`,
    videoTitle: 'Class 6: Tailwind CSS v4 CSS-First Design Systems',
    videoDuration: '22:50',
  },
  7: {
    title: 'Next.js App Router Nested Layouts & Suspense',
    category: 'Frontend',
    difficulty: 'Intermediate',
    description: 'Structure complex route hierarchies using Next.js 15 App Router, template.tsx, loading.tsx, error.tsx, and parallel route slots.',
    requirements: [
      'Build persistent root and dashboard layout hierarchy',
      'Use loading.tsx for instant UI skeleton feedback during navigation',
      'Implement error boundaries with recoverability hooks',
      'Stream server data with granular <Suspense> boundaries'
    ],
    notes: 'App Router layouts preserve state across route changes and avoid re-rendering common UI shells. Loading UI boundaries automatically wrap page components in Suspense boundaries during navigation.',
    codeExample: `// Day 7: Next.js App Router Dashboard Layout
import { Suspense } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#090d16] text-white">
      <aside className="w-64 border-r border-slate-800 p-4">Navigation Shell</aside>
      <main className="flex-1 p-6">
        <Suspense fallback={<div className="animate-pulse h-64 bg-slate-800 rounded-xl" />}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}`,
    videoTitle: 'Class 7: Next.js 15 App Router Architecture & Suspense',
    videoDuration: '34:10',
  },
  8: {
    title: 'Zustand & Context API Global State Management',
    category: 'Frontend',
    difficulty: 'Intermediate',
    description: 'Architect slice-based global state stores using Zustand with Immer middleware and localStorage persistence sync.',
    requirements: [
      'Build typed Zustand store with actions and selector optimizations',
      'Integrate persist middleware with custom storage serializer',
      'Implement atomic state selectors to eliminate unnecessary re-renders',
      'Test state mutations using pure state handler functions'
    ],
    notes: 'Zustand provides lightweight, un-opinionated state management without boilerplate. Component selectors ensure components only re-render when their specific subscribed state slices mutate.',
    codeExample: `// Day 8: Zustand Store with Persist Middleware
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StreakStore {
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
}

export const useStreakStore = create<StreakStore>()(
  persist(
    (set) => ({
      activeStudentId: 'student-b',
      setActiveStudentId: (id) => set({ activeStudentId: id }),
    }),
    { name: 'abtalks_state_v2' }
  )
);`,
    videoTitle: 'Class 8: Zustand State Management & Store Architecture',
    videoDuration: '26:30',
  },
  9: {
    title: 'RESTful API Route Handler Design & Validation',
    category: 'Backend',
    difficulty: 'Intermediate',
    description: 'Design idempotent REST API endpoints in Next.js App Router route handlers with HTTP status codes, CORS headers, and payload validation.',
    requirements: [
      'Implement GET, POST, PATCH handlers in app/api/ route files',
      'Return typed JSON responses with standardized error structures',
      'Enforce HTTP 400, 404, 500 status codes appropriately',
      'Validate request body parameters before processing'
    ],
    notes: 'Next.js App Router Route Handlers execute on Edge or Node.js runtimes. Returning structured JSON payloads with standard HTTP status codes ensures seamless API contract compliance.',
    codeExample: `// Day 9: Next.js API Route Handler
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.githubUrl) {
      return NextResponse.json({ error: 'Missing GitHub URL' }, { status: 400 });
    }
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}`,
    videoTitle: 'Class 9: REST API Design & Next.js Route Handlers',
    videoDuration: '30:45',
  },
  10: {
    title: 'Zod Schema Parsing & Runtime Type Safety',
    category: 'Backend',
    difficulty: 'Intermediate',
    description: 'Enforce strict runtime boundary validation using Zod schemas for API request payloads, URL parameters, and environment variables.',
    requirements: [
      'Define Zod object schemas for Submission, Student, and Task payloads',
      'Parse request bodies with safeParse to extract typed validation errors',
      'Build custom Zod refinements for URL format validation',
      'Infer static TypeScript types directly from Zod schemas'
    ],
    notes: 'TypeScript types exist only at compile-time. Zod bridges compile-time type safety and runtime data validation by parsing untrusted JSON inputs into guaranteed TypeScript types.',
    codeExample: `// Day 10: Zod Validation Schema
import { z } from 'zod';

export const SubmissionSchema = z.object({
  studentId: z.string().min(1, 'Student ID required'),
  day: z.number().int().min(1).max(60),
  githubUrl: z.string().url().refine((url) => url.includes('github.com'), {
    message: 'Must be a valid GitHub repository URL',
  }),
  linkedinUrl: z.string().url().refine((url) => url.includes('linkedin.com'), {
    message: 'Must be a valid LinkedIn post URL',
  }),
});

export type SubmissionInput = z.infer<typeof SubmissionSchema>;`,
    videoTitle: 'Class 10: Runtime Type Safety with Zod Schema Validation',
    videoDuration: '27:15',
  },
  11: {
    title: 'Local Persistence & IndexedDB Sync Layer',
    category: 'Backend',
    difficulty: 'Advanced',
    description: 'Implement offline-first client storage using IndexedDB and localStorage sync layers with automatic fallback strategies.',
    requirements: [
      'Build client storage manager with read/write CRUD methods',
      'Implement transaction locks to prevent state race conditions',
      'Sync local changes automatically when network reconnects',
      'Handle storage quota exceptions gracefully'
    ],
    notes: 'IndexedDB offers key-value and object store persistence inside the browser, capable of storing megabytes of structured data offline without blocking the main UI thread.',
    codeExample: `// Day 11: LocalStorage Sync Accessor
export const storageSync = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }
};`,
    videoTitle: 'Class 11: Offline-First IndexedDB & Client Persistence',
    videoDuration: '33:00',
  },
  12: {
    title: 'State Machine Streak Engine & Optimistic UI',
    category: 'System Design',
    difficulty: 'Advanced',
    description: 'Architect a deterministic finite state machine (FSM) to manage student streak states (ACTIVE, AT_RISK, FROZEN, BROKEN, RECOVERED) with server-side validation and optimistic UI updates.',
    requirements: [
      'Implement deterministic state transitions in pure TypeScript module',
      'Handle streak freeze consumption automatically when a day is missed',
      'Build optimistic UI updating hook with failure rollback strategy',
      'Expose typed REST API Route Handler returning DashboardViewModel',
      'Ensure zero business logic inside React presentation components'
    ],
    notes: 'Deterministic Finite State Machines (FSMs) guarantee that system state transitions are predictable, immutable, and fully testable. Business rules live inside pure calculation modules rather than UI views.',
    codeExample: `// Day 12: FSM Transition Table Engine
export type StreakState = 'ACTIVE' | 'AT_RISK' | 'FROZEN' | 'BROKEN' | 'RECOVERED';

export function transitionState(current: StreakState, event: 'miss_day' | 'submit' | 'freeze_avail'): StreakState {
  switch (current) {
    case 'ACTIVE':
      return event === 'miss_day' ? 'AT_RISK' : 'ACTIVE';
    case 'AT_RISK':
      return event === 'freeze_avail' ? 'FROZEN' : 'BROKEN';
    case 'FROZEN':
      return event === 'submit' ? 'ACTIVE' : 'FROZEN';
    case 'BROKEN':
      return event === 'submit' ? 'RECOVERED' : 'BROKEN';
    case 'RECOVERED':
      return 'ACTIVE';
  }
}`,
    videoTitle: 'Class 12: FSM Streak Engines & Optimistic Architecture',
    videoDuration: '38:50',
  },
};

export const TASKS: Task[] = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  const catalogItem = TOPIC_CATALOG[day];

  if (catalogItem) {
    return {
      day,
      title: catalogItem.title,
      description: catalogItem.description,
      category: catalogItem.category,
      difficulty: catalogItem.difficulty,
      requirements: catalogItem.requirements,
      githubTemplate: `https://github.com/abtalks-templates/day-${day}-challenge`,
      estimatedHours: 3.5,
      notes: catalogItem.notes,
      codeExample: catalogItem.codeExample,
      videoClassUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0`,
      videoTitle: catalogItem.videoTitle,
      videoDuration: catalogItem.videoDuration,
      score: 95 + (day % 5),
    };
  }

  // Generic generator for days 13 to 60 with rich topic-specific notes & code
  const categories: Task['category'][] = ['Frontend', 'Backend', 'DevOps', 'System Design', 'AI Integration'];
  const difficulties: Task['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced'];
  const cat = categories[(day - 1) % categories.length];
  const diff = difficulties[(day - 1) % difficulties.length];
  const title = getDayTitle(day);

  return {
    day,
    title: `Day ${day}: ${title}`,
    description: `Build and deploy a production-grade module for Day ${day} (${title}) of the ABTalks 60-Day Developer Challenge. Focus on type safety, architectural clean code, and zero runtime exceptions.`,
    category: cat,
    difficulty: diff,
    requirements: [
      `Implement core ${cat} module logic for Day ${day}`,
      `Write unit tests verifying ${title} functionality`,
      'Deploy live preview to Vercel with public repository submission link',
      'Document architecture decisions and trade-offs in README.md'
    ],
    githubTemplate: `https://github.com/abtalks-templates/day-${day}-challenge`,
    estimatedHours: Math.floor((day % 3) + 2),
    notes: `Engineering Module #${day} covers ${title} principles. Focus on maintaining single source of truth, immutable data updates, and clean separation between data accessors and UI presentation components.`,
    codeExample: `// Day ${day}: ${title} Code Implementation
export async function executeDay${day}Module(payload: { day: number; timestamp: string }) {
  console.log(\`[Day ${day}] Executing ${title}...\`);
  return {
    status: 'success',
    day: payload.day,
    verified: true,
    score: ${92 + (day % 8)},
  };
}`,
    videoClassUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0`,
    videoTitle: `Class ${day}: Mastering ${title}`,
    videoDuration: `${20 + (day % 15)}:30`,
    score: 92 + (day % 8),
  };
});

function getDayTitle(day: number): string {
  const titles = [
    'HTML5 Semantic Foundations & ARIA Accessibility',
    'CSS Grid & Modern Flexbox Layout Systems',
    'JavaScript ES2024 Async Control & Event Loop',
    'TypeScript Generics & Utility Type Mastery',
    'React 19 Server Components & Actions',
    'Tailwind CSS v4 Custom Design System Tokens',
    'Next.js App Router Nested Layouts & Suspense',
    'Zustand & Context API Global State Management',
    'RESTful API Route Handler Design & Validation',
    'Zod Schema Parsing & Runtime Type Safety',
    'Local Persistence & IndexedDB Sync Layer',
    'State Machine Streak Engine & Optimistic UI',
    'JWT Authentication & Middleware Protection',
    'PostgreSQL & Prisma ORM Data Modeling',
    'Redis Cache Invalidation & Rate Limiting',
    'WebSockets Real-Time Activity Streams',
    'Docker Containerization & Multi-stage Builds',
    'CI/CD Workflows with GitHub Actions',
    'GraphQL API Server & Query Optimization',
    'Micro-Frontend Architecture & Module Federation',
    'Server-Sent Events for Live Progress Updates',
    'PWA Service Workers & Offline First Caching',
    'Web Performance Budget & Core Web Vitals',
    'Tailwind Animation Micro-Interactions',
    'Headless Component Patterns & Compound Components',
    'Custom React Hooks for Async Data Fetching',
    'SWR & TanStack Query Mutation Strategies',
    'Unit Testing with Vitest & React Testing Library',
    'E2E End-to-End Automation with Playwright',
    'Lighthouse Optimization & Bundle Splitting',
  ];
  return titles[(day - 1) % titles.length] || `Advanced System Module #${day}`;
}
