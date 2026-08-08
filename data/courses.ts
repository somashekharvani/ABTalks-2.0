import { Course } from '@/types';
export { COURSE_MODULES } from './modules';
export { LESSONS } from './lessons';
export { QUIZZES } from './assessments';

export const COURSES: Course[] = [
  {
    id: 'course-frontend',
    title: 'Frontend Development',
    description: 'Build modern responsive web applications with React 19, TypeScript, and Next.js 15.',
    category: 'Frontend Engineering',
    difficulty: 'Intermediate',
    durationDays: 60,
    totalProjects: 8,
    badgeIcon: 'Code2',
  },
  {
    id: 'course-fullstack',
    title: 'Full Stack Development',
    description: 'Build production-style full-stack applications with PostgreSQL, REST, and Server Actions.',
    category: 'Full Stack Engineering',
    difficulty: 'Advanced',
    durationDays: 60,
    totalProjects: 7,
    badgeIcon: 'Layers',
  },
  {
    id: 'course-backend',
    title: 'Backend Development',
    description: 'Architect scalable backend APIs, Redis caching layers, and database migrations.',
    category: 'Backend Systems',
    difficulty: 'Advanced',
    durationDays: 60,
    totalProjects: 7,
    badgeIcon: 'Server',
  },
  {
    id: 'course-ai',
    title: 'AI Engineering',
    description: 'Master RAG pipelines, autonomous agents, LLM tool integration, and vector databases.',
    category: 'AI Systems',
    difficulty: 'Advanced',
    durationDays: 60,
    totalProjects: 8,
    badgeIcon: 'Cpu',
  },
];
