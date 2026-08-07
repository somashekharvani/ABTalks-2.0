import { Task } from '@/types';

export const TASKS: Task[] = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;

  if (day === 12) {
    return {
      day: 12,
      title: 'State Machine Streak Engine & Optimistic UI',
      description: 'Architect a deterministic finite state machine (FSM) to manage student streak states (ACTIVE, AT_RISK, FROZEN, BROKEN, RECOVERED) with server-side validation and optimistic UI updates.',
      category: 'System Design',
      difficulty: 'Advanced',
      requirements: [
        'Implement deterministic state transitions in pure TypeScript module',
        'Handle streak freeze consumption automatically when a day is missed',
        'Build optimistic UI updating hook with failure rollback strategy',
        'Expose typed REST API Route Handler returning DashboardViewModel',
        'Ensure zero business logic inside React presentation components'
      ],
      githubTemplate: 'https://github.com/abtalks-templates/day-12-streak-engine',
      estimatedHours: 3.5,
    };
  }

  const categories: Task['category'][] = ['Frontend', 'Backend', 'DevOps', 'System Design', 'AI Integration'];
  const difficulties: Task['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced'];

  return {
    day,
    title: `Day ${day}: ${getDayTitle(day)}`,
    description: `Build and deploy a scalable production module for Day ${day} of the ABTalks 60-Day Developer Challenge. Focus on type safety, clean architecture, and user experience.`,
    category: categories[(day - 1) % categories.length],
    difficulty: difficulties[(day - 1) % difficulties.length],
    requirements: [
      `Implement core module logic for Day ${day}`,
      'Write comprehensive unit tests with >90% coverage',
      'Deploy live preview to Vercel/Netlify with public repository link',
      'Document architecture decisions in README.md'
    ],
    githubTemplate: `https://github.com/abtalks-templates/day-${day}-challenge`,
    estimatedHours: Math.floor(Math.random() * 3) + 2,
  };
});

function getDayTitle(day: number): string {
  const titles = [
    'HTML5 Semantic Foundations & Accessibility',
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
