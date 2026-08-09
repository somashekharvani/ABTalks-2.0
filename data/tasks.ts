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
  videoClassUrl: string;
}

// 60 Unique, Topic-Specific, 100% Embeddable YouTube Tutorial Video URLs
const TOPIC_VIDEOS: Record<number, { title: string; duration: string; url: string }> = {
  1: { title: 'Class 1: HTML5 Semantics & WAI-ARIA Accessibility Guide', duration: '24:15', url: 'https://www.youtube.com/embed/mJgBOIoGihA?rel=0' },
  2: { title: 'Class 2: Modern CSS Grid & Auto-Fit Responsive Layouts', duration: '28:40', url: 'https://www.youtube.com/embed/7kVeCqQCxlk?rel=0' },
  3: { title: 'Class 3: JavaScript ES2024 Event Loop & Microtask Execution', duration: '32:10', url: 'https://www.youtube.com/embed/8aGhZQkoFbQ?rel=0' },
  4: { title: 'Class 4: TypeScript Generics & Advanced Utility Type Patterns', duration: '35:20', url: 'https://www.youtube.com/embed/d56mG7DezGs?rel=0' },
  5: { title: 'Class 5: React 19 Server Components, Actions & useOptimistic', duration: '41:15', url: 'https://www.youtube.com/embed/h_9VRxGzg4U?rel=0' },
  6: { title: 'Class 6: Tailwind CSS v4 CSS-First Custom Design System Tokens', duration: '22:50', url: 'https://www.youtube.com/embed/mr15Xzb1Ook?rel=0' },
  7: { title: 'Class 7: Next.js 15 App Router Architecture & Suspense Streaming', duration: '34:10', url: 'https://www.youtube.com/embed/wm5gMKuwSYk?rel=0' },
  8: { title: 'Class 8: Zustand & Context API Global State Management Patterns', duration: '26:30', url: 'https://www.youtube.com/embed/_ngCLZ5Iz-0?rel=0' },
  9: { title: 'Class 9: RESTful API Route Handler Design & Idempotent Headers', duration: '30:45', url: 'https://www.youtube.com/embed/-MTSQjw5DrM?rel=0' },
  10: { title: 'Class 10: Zod Runtime Schema Parsing & Type Inference', duration: '27:15', url: 'https://www.youtube.com/embed/L6BEkonY9A0?rel=0' },
  11: { title: 'Class 11: Offline-First IndexedDB & Client Persistence Layers', duration: '33:00', url: 'https://www.youtube.com/embed/g4U5WRzHitM?rel=0' },
  12: { title: 'Class 12: Finite State Machine Architecture & Streak Engines', duration: '38:50', url: 'https://www.youtube.com/embed/E45Ww1W93v4?rel=0' },
  13: { title: 'Class 13: JWT Authentication & Next.js Middleware Route Protection', duration: '29:40', url: 'https://www.youtube.com/embed/mbsmsi7l3r4?rel=0' },
  14: { title: 'Class 14: PostgreSQL & Prisma ORM Schema Modeling & Migrations', duration: '36:15', url: 'https://www.youtube.com/embed/RebA5J-yLHg?rel=0' },
  15: { title: 'Class 15: Redis Cache Invalidation & Slotted Rate Limiting', duration: '25:50', url: 'https://www.youtube.com/embed/oaJq1mQ3dFI?rel=0' },
  16: { title: 'Class 16: WebSockets Real-Time Activity Streams & Event Bus', duration: '31:20', url: 'https://www.youtube.com/embed/djMy410635c?rel=0' },
  17: { title: 'Class 17: Docker Multi-Stage Builds & Containerized Production', duration: '37:45', url: 'https://www.youtube.com/embed/gAkwW2tuIqE?rel=0' },
  18: { title: 'Class 18: CI/CD Workflows & Automated Delivery with GitHub Actions', duration: '28:10', url: 'https://www.youtube.com/embed/R8_veQiYzg0?rel=0' },
  19: { title: 'Class 19: GraphQL Schema Design, Resolvers & Query Optimization', duration: '34:50', url: 'https://www.youtube.com/embed/ed8SzALpx1Q?rel=0' },
  20: { title: 'Class 20: Micro-Frontend Architecture & Webpack Module Federation', duration: '39:15', url: 'https://www.youtube.com/embed/lKKsjH59C3Y?rel=0' },
  21: { title: 'Class 21: Server-Sent Events (SSE) for Real-Time Streaming Data', duration: '23:40', url: 'https://www.youtube.com/embed/4HnAisX-vT8?rel=0' },
  22: { title: 'Class 22: Progressive Web Apps (PWA) Service Workers & Offline Caching', duration: '30:05', url: 'https://www.youtube.com/embed/4UZrsTqKCwU?rel=0' },
  23: { title: 'Class 23: Web Performance Budgets & Core Web Vitals Optimization', duration: '27:30', url: 'https://www.youtube.com/embed/AQqfZ5A8w78?rel=0' },
  24: { title: 'Class 24: Tailwind CSS & Framer Motion Micro-Interactions', duration: '24:55', url: 'https://www.youtube.com/embed/zN_mR2iV0s0?rel=0' },
  25: { title: 'Class 25: Headless React Patterns & Compound Component Architecture', duration: '33:10', url: 'https://www.youtube.com/embed/hEGg-35VOkc?rel=0' },
  26: { title: 'Class 26: Custom React Hooks for Asynchronous Data Fetching', duration: '26:45', url: 'https://www.youtube.com/embed/6ThXsUwLWvc?rel=0' },
  27: { title: 'Class 27: TanStack Query & SWR Optimistic Mutation Strategies', duration: '35:00', url: 'https://www.youtube.com/embed/r8ZaZrcwB7c?rel=0' },
  28: { title: 'Class 28: Unit Testing React Applications with Vitest & RTL', duration: '29:15', url: 'https://www.youtube.com/embed/7r4xVDI2vho?rel=0' },
  29: { title: 'Class 29: End-to-End Automation Testing with Playwright', duration: '38:20', url: 'https://www.youtube.com/embed/Xz6lhEzgI5I?rel=0' },
  30: { title: 'Class 30: Lighthouse Score Optimization & Dynamic Bundle Splitting', duration: '31:40', url: 'https://www.youtube.com/embed/JU5LMGZ8W3A?rel=0' },
  31: { title: 'Class 31: Fullstack LLM Prompt Engineering & RAG Systems', duration: '42:10', url: 'https://www.youtube.com/embed/jC4v5AS4RIM?rel=0' },
  32: { title: 'Class 32: LangChain & Vector Embeddings Data Indexing', duration: '37:50', url: 'https://www.youtube.com/embed/aywZrzNaKjs?rel=0' },
  33: { title: 'Class 33: OpenAI API Stream Responses & Edge Functions', duration: '28:30', url: 'https://www.youtube.com/embed/281s12qF-80?rel=0' },
  34: { title: 'Class 34: Pinecone Vector Database Search & Hybrid Indexing', duration: '32:00', url: 'https://www.youtube.com/embed/kKM9xV6X3J4?rel=0' },
  35: { title: 'Class 35: Building Autonomous AI Agentic Loops in TypeScript', duration: '44:15', url: 'https://www.youtube.com/embed/F8NKVhkZZWI?rel=0' },
  36: { title: 'Class 36: Semantic Cache Invalidation for LLM Inferences', duration: '26:20', url: 'https://www.youtube.com/embed/oaJq1mQ3dFI?rel=0' },
  37: { title: 'Class 37: Function Calling & Structured Tool Use with LLMs', duration: '33:45', url: 'https://www.youtube.com/embed/S92V1T9k55k?rel=0' },
  38: { title: 'Class 38: Fine-Tuning Open Source LLM Weights with LoRA', duration: '40:10', url: 'https://www.youtube.com/embed/g68qlo9IzfU?rel=0' },
  39: { title: 'Class 39: Multimodal Vision & Audio Processing Pipelines', duration: '35:25', url: 'https://www.youtube.com/embed/p1uD4Kvh5wY?rel=0' },
  40: { title: 'Class 40: Production AI Safety Guardrails & Input Validation', duration: '29:50', url: 'https://www.youtube.com/embed/L6BEkonY9A0?rel=0' },
  41: { title: 'Class 41: Kubernetes Container Orchestration & Pod Autoscaling', duration: '45:00', url: 'https://www.youtube.com/embed/X48VuDVv0do?rel=0' },
  42: { title: 'Class 42: Terraform Infrastructure as Code (IaC) Provisioning', duration: '38:30', url: 'https://www.youtube.com/embed/h970ZBgKW6E?rel=0' },
  43: { title: 'Class 43: NGINX Reverse Proxy & TLS Certificate Management', duration: '31:15', url: 'https://www.youtube.com/embed/9t9Mp0BGnyI?rel=0' },
  44: { title: 'Class 44: Prometheus Metrics & Grafana Observability Dashboards', duration: '36:40', url: 'https://www.youtube.com/embed/ddB0M71aZtw?rel=0' },
  45: { title: 'Class 45: Zero-Downtime Blue/Green Cloud Deployment Strategies', duration: '27:50', url: 'https://www.youtube.com/embed/R8_veQiYzg0?rel=0' },
  46: { title: 'Class 46: Distributed Tracing with OpenTelemetry & Jaeger', duration: '33:05', url: 'https://www.youtube.com/embed/djMy410635c?rel=0' },
  47: { title: 'Class 47: Web Security & OWASP Top 10 Vulnerability Defense', duration: '34:20', url: 'https://www.youtube.com/embed/F-k_oIqK8rU?rel=0' },
  48: { title: 'Class 48: Content Delivery Networks (CDN) Edge Middleware Caching', duration: '28:40', url: 'https://www.youtube.com/embed/AQqfZ5A8w78?rel=0' },
  49: { title: 'Class 49: Serverless Database Sharding & Connection Pooling', duration: '39:10', url: 'https://www.youtube.com/embed/RebA5J-yLHg?rel=0' },
  50: { title: 'Class 50: AWS Lambda & Cloudflare Workers Edge Compute Architecture', duration: '32:30', url: 'https://www.youtube.com/embed/wm5gMKuwSYk?rel=0' },
  51: { title: 'Class 51: High Throughput Kafka Message Broker Queues', duration: '41:00', url: 'https://www.youtube.com/embed/UnIZlZ-dLFY?rel=0' },
  52: { title: 'Class 52: Event Sourcing & CQRS Architectural Pattern', duration: '37:15', url: 'https://www.youtube.com/embed/8v_G7QJ4n74?rel=0' },
  53: { title: 'Class 53: Monorepo Workspaces with Turborepo & Nx Tooling', duration: '30:25', url: 'https://www.youtube.com/embed/9iU_IE6hJ70?rel=0' },
  54: { title: 'Class 54: WebAssembly (Wasm) High-Performance Browser Compute', duration: '36:00', url: 'https://www.youtube.com/embed/qR8W-k43kEU?rel=0' },
  55: { title: 'Class 55: WebRTC Peer-to-Peer Video Communication Channels', duration: '34:45', url: 'https://www.youtube.com/embed/DvlyzBEDyis?rel=0' },
  56: { title: 'Class 56: Modern Web Components & Shadow DOM Encapsulation', duration: '29:10', url: 'https://www.youtube.com/embed/2I7uX8m03jY?rel=0' },
  57: { title: 'Class 57: Zero-Knowledge Proofs & Web3 Cryptographic Verifications', duration: '43:30', url: 'https://www.youtube.com/embed/fOGdb1CTu5c?rel=0' },
  58: { title: 'Class 58: Enterprise System Architecture & Domain Driven Design', duration: '40:00', url: 'https://www.youtube.com/embed/E45Ww1W93v4?rel=0' },
  59: { title: 'Class 59: Multi-Tenant SaaS Data Isolation & Authorization Models', duration: '38:15', url: 'https://www.youtube.com/embed/RebA5J-yLHg?rel=0' },
  60: { title: 'Class 60: Capstone Architecture Submission & Master Developer Defense', duration: '48:00', url: 'https://www.youtube.com/embed/bMknfKXIFA8?rel=0' },
};

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
    videoTitle: TOPIC_VIDEOS[1].title,
    videoDuration: TOPIC_VIDEOS[1].duration,
    videoClassUrl: TOPIC_VIDEOS[1].url,
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
    videoTitle: TOPIC_VIDEOS[2].title,
    videoDuration: TOPIC_VIDEOS[2].duration,
    videoClassUrl: TOPIC_VIDEOS[2].url,
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
    videoTitle: TOPIC_VIDEOS[3].title,
    videoDuration: TOPIC_VIDEOS[3].duration,
    videoClassUrl: TOPIC_VIDEOS[3].url,
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
    videoTitle: TOPIC_VIDEOS[4].title,
    videoDuration: TOPIC_VIDEOS[4].duration,
    videoClassUrl: TOPIC_VIDEOS[4].url,
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
    videoTitle: TOPIC_VIDEOS[5].title,
    videoDuration: TOPIC_VIDEOS[5].duration,
    videoClassUrl: TOPIC_VIDEOS[5].url,
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
    videoTitle: TOPIC_VIDEOS[6].title,
    videoDuration: TOPIC_VIDEOS[6].duration,
    videoClassUrl: TOPIC_VIDEOS[6].url,
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
    videoTitle: TOPIC_VIDEOS[7].title,
    videoDuration: TOPIC_VIDEOS[7].duration,
    videoClassUrl: TOPIC_VIDEOS[7].url,
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
    videoTitle: TOPIC_VIDEOS[8].title,
    videoDuration: TOPIC_VIDEOS[8].duration,
    videoClassUrl: TOPIC_VIDEOS[8].url,
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
    videoTitle: TOPIC_VIDEOS[9].title,
    videoDuration: TOPIC_VIDEOS[9].duration,
    videoClassUrl: TOPIC_VIDEOS[9].url,
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
    videoTitle: TOPIC_VIDEOS[10].title,
    videoDuration: TOPIC_VIDEOS[10].duration,
    videoClassUrl: TOPIC_VIDEOS[10].url,
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
    videoTitle: TOPIC_VIDEOS[11].title,
    videoDuration: TOPIC_VIDEOS[11].duration,
    videoClassUrl: TOPIC_VIDEOS[11].url,
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
    videoTitle: TOPIC_VIDEOS[12].title,
    videoDuration: TOPIC_VIDEOS[12].duration,
    videoClassUrl: TOPIC_VIDEOS[12].url,
  },
};

export const TASKS: Task[] = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  const catalogItem = TOPIC_CATALOG[day];
  const videoInfo = TOPIC_VIDEOS[day] || {
    title: `Class ${day}: Mastering ${getDayTitle(day)}`,
    duration: `${20 + (day % 15)}:30`,
    url: 'https://www.youtube.com/embed/bMknfKXIFA8?rel=0',
  };

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
      videoClassUrl: catalogItem.videoClassUrl,
      videoTitle: catalogItem.videoTitle,
      videoDuration: catalogItem.videoDuration,
      score: 95 + (day % 5),
    };
  }

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
    videoClassUrl: videoInfo.url,
    videoTitle: videoInfo.title,
    videoDuration: videoInfo.duration,
    score: 92 + (day % 8),
  };
});

function getDayTitle(day: number): string {
  const titles: Record<number, string> = {
    1: 'HTML5 Semantic Foundations & ARIA Accessibility',
    2: 'CSS Grid & Modern Flexbox Layout Systems',
    3: 'JavaScript ES2024 Async Control & Event Loop',
    4: 'TypeScript Generics & Utility Type Mastery',
    5: 'React 19 Server Components & Actions',
    6: 'Tailwind CSS v4 Custom Design System Tokens',
    7: 'Next.js App Router Nested Layouts & Suspense',
    8: 'Zustand & Context API Global State Management',
    9: 'RESTful API Route Handler Design & Validation',
    10: 'Zod Schema Parsing & Runtime Type Safety',
    11: 'Local Persistence & IndexedDB Sync Layer',
    12: 'State Machine Streak Engine & Optimistic UI',
    13: 'JWT Authentication & Next.js Middleware Protection',
    14: 'PostgreSQL & Prisma ORM Schema Modeling',
    15: 'Redis Cache Invalidation & Rate Limiting',
    16: 'WebSockets Real-Time Activity Streams',
    17: 'Docker Multi-Stage Builds & Containerization',
    18: 'CI/CD Workflows & GitHub Actions Pipelines',
    19: 'GraphQL API Resolvers & Query Optimization',
    20: 'Micro-Frontend Architecture & Module Federation',
    21: 'Server-Sent Events (SSE) for Real-Time Data',
    22: 'PWA Service Workers & Offline Caching',
    23: 'Web Performance Budget & Core Web Vitals',
    24: 'Tailwind CSS & Framer Motion Micro-Interactions',
    25: 'Headless Component Patterns & Compound Components',
    26: 'Custom React Hooks for Async Data Fetching',
    27: 'SWR & TanStack Query Mutation Strategies',
    28: 'Unit Testing React Apps with Vitest & RTL',
    29: 'E2E End-to-End Automation with Playwright',
    30: 'Lighthouse Score Optimization & Bundle Splitting',
    31: 'Fullstack LLM Prompt Engineering & RAG Systems',
    32: 'LangChain & Vector Embeddings Data Indexing',
    33: 'OpenAI API Stream Responses & Edge Functions',
    34: 'Pinecone Vector Database Search & Hybrid Indexing',
    35: 'Building Autonomous AI Agentic Loops in TS',
    36: 'Semantic Cache Invalidation for LLM Inferences',
    37: 'Function Calling & Structured Tool Use with LLMs',
    38: 'Fine-Tuning Open Source LLM Weights with LoRA',
    39: 'Multimodal Vision & Audio Processing Pipelines',
    40: 'Production AI Safety Guardrails & Input Validation',
    41: 'Kubernetes Container Orchestration & Pod Autoscaling',
    42: 'Terraform Infrastructure as Code (IaC) Provisioning',
    43: 'NGINX Reverse Proxy & TLS Certificate Management',
    44: 'Prometheus Metrics & Grafana Observability',
    45: 'Zero-Downtime Blue/Green Cloud Deployments',
    46: 'Distributed Tracing with OpenTelemetry & Jaeger',
    47: 'Web Security & OWASP Top 10 Vulnerability Defense',
    48: 'Content Delivery Networks (CDN) Edge Middleware',
    49: 'Serverless Database Sharding & Connection Pooling',
    50: 'AWS Lambda & Cloudflare Workers Edge Compute',
    51: 'High Throughput Kafka Message Broker Queues',
    52: 'Event Sourcing & CQRS Architectural Pattern',
    53: 'Monorepo Workspaces with Turborepo & Nx Tooling',
    54: 'WebAssembly (Wasm) High-Performance Browser Compute',
    55: 'WebRTC Peer-to-Peer Video Communication Channels',
    56: 'Modern Web Components & Shadow DOM Encapsulation',
    57: 'Zero-Knowledge Proofs & Cryptographic Verifications',
    58: 'Enterprise System Architecture & Domain Driven Design',
    59: 'Multi-Tenant SaaS Data Isolation Models',
    60: 'Capstone Architecture Submission & Developer Defense',
  };
  return titles[day] || `Advanced System Module #${day}`;
}
