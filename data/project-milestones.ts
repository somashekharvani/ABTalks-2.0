import { ProjectMilestone } from '@/types';

interface MilestoneDetail {
  title: string;
  description: string;
  requirements: string[];
  estimatedMinutes: number;
  requiredConcepts: string[];
}

const MILESTONE_SYLLABUS: Record<number, MilestoneDetail> = {
  1: {
    title: 'Personal Portfolio Day 1: Semantic Layout Skeleton',
    description: 'Scaffold the HTML5 semantic layout skeleton (<header>, <nav>, <main>, <article>, <footer>) with accessible ARIA landmarks.',
    requirements: [
      'Create semantic HTML5 layout with <header>, <nav>, <main>, and <footer>',
      'Add accessible ARIA labels to primary navigation links',
      'Set up mobile-friendly viewport meta tag and title',
      'Push Day 1 commit to single repository: github.com/student/personal-portfolio',
    ],
    estimatedMinutes: 45,
    requiredConcepts: ['Semantic HTML5', 'ARIA Landmarks', 'DOM Hierarchy', 'Mobile Viewport'],
  },
  2: {
    title: 'Personal Portfolio Day 2: Flexbox Navigation & Hero Section',
    description: 'Style header navigation and hero section using CSS Flexbox alignment, box-sizing: border-box, and responsive spacing.',
    requirements: [
      'Implement CSS Flexbox navbar with justify-content: space-between',
      'Align hero section text and avatar image using flexbox cross-axis alignment',
      'Apply global box-sizing: border-box reset rules',
      'Push Day 2 commit to single repository: github.com/student/personal-portfolio',
    ],
    estimatedMinutes: 60,
    requiredConcepts: ['Flexbox Alignment', 'Box Model Sizing', 'Responsive Spacing', 'Hero Section'],
  },
  3: {
    title: 'Personal Portfolio Day 3: CSS Grid Projects Showcase',
    description: 'Build a fluid responsive projects grid using repeat(auto-fit, minmax(280px, 1fr)) and mobile-first CSS media queries.',
    requirements: [
      'Create 2D responsive project grid using CSS Grid and auto-fit minmax',
      'Add hover elevation micro-animations to project cards',
      'Ensure grid collapses cleanly on 390px mobile viewports',
      'Push Day 3 commit to single repository: github.com/student/personal-portfolio',
    ],
    estimatedMinutes: 60,
    requiredConcepts: ['CSS Grid System', 'Auto-Fit & Minmax', 'Hover Elevation', 'Mobile Responsive'],
  },
  4: {
    title: 'Personal Portfolio Day 4: Interactive Theme Switcher & ES6 Events',
    description: 'Add an interactive JavaScript dark/light theme switcher using ES6 DOM querySelector, dataset attributes, and event listeners.',
    requirements: [
      'Add theme toggle button with JavaScript event listener',
      'Toggle data-theme="dark" attribute on <html> element',
      'Apply CSS variables for background and primary text colors',
      'Push Day 4 commit to single repository: github.com/student/personal-portfolio',
    ],
    estimatedMinutes: 50,
    requiredConcepts: ['ES6 Event Delegation', 'DOM Dataset', 'CSS Variables Theme', 'Theme Switcher'],
  },
  5: {
    title: 'Personal Portfolio Day 5: Live GitHub Repositories Fetch',
    description: 'Fetch and display public GitHub repositories dynamically using async/await, native fetch API, and JSON parsing.',
    requirements: [
      'Fetch public repository list from GitHub REST API',
      'Render dynamic repository cards with star counts and tech tags',
      'Add try/catch error handling and loading fallback message',
      'Push Day 5 commit to single repository: github.com/student/personal-portfolio',
    ],
    estimatedMinutes: 75,
    requiredConcepts: ['Async/Await Fetch', 'GitHub REST API', 'JSON Parsing', 'Error Boundaries'],
  },
  6: {
    title: 'Personal Portfolio Day 6: Fluid Typography & CSS Tokens',
    description: 'Refactor typography to use CSS clamp() fluid scaling and CSS custom property design system tokens.',
    requirements: [
      'Apply clamp(1.2rem, 3vw, 2.5rem) fluid typography to headings',
      'Centralize color, font-family, and spacing variables in CSS :root',
      'Perform mobile-first 390px viewport typography audit',
      'Push Day 6 commit to single repository: github.com/student/personal-portfolio',
    ],
    estimatedMinutes: 50,
    requiredConcepts: ['Fluid Typography Clamp', 'CSS Design Tokens', 'Fluid Scaling', 'Viewport Polish'],
  },
  7: {
    title: 'Personal Portfolio Day 7: Lighthouse Audit & Vercel Deploy',
    description: 'Perform Lighthouse performance audit, optimize OpenGraph meta tags, and deploy live production site to Vercel.',
    requirements: [
      'Achieve 90+ Lighthouse audit scores in Accessibility & Best Practices',
      'Add social proof OpenGraph meta image and title preview tags',
      'Deploy live project to Vercel and link live demo URL',
      'Push Day 7 final commit to single repository: github.com/student/personal-portfolio',
    ],
    estimatedMinutes: 90,
    requiredConcepts: ['Lighthouse Audits', 'OpenGraph Meta Tags', 'Vercel Live Deployment', 'Sprint Completion'],
  },
  8: {
    title: 'TaskFlow Day 8: React 19 Component Tree Architecture',
    description: 'Scaffold TaskFlow task manager application in React 19 with functional components, typed interfaces, and JSX layout.',
    requirements: [
      'Scaffold TaskFlow app component tree (Header, TaskInput, TaskList, TaskCard)',
      'Define TypeScript Task and FilterStatus interfaces',
      'Set up JSX layout structure with Tailwind CSS styling',
      'Push Day 8 commit to single repository: github.com/student/taskflow',
    ],
    estimatedMinutes: 60,
    requiredConcepts: ['React 19 Functional Components', 'JSX Layout', 'TypeScript Interfaces', 'TaskFlow Scaffold'],
  },
  12: {
    title: 'TaskFlow Day 12: Persistent Task State & LocalStorage Sync',
    description: 'Add state management and LocalStorage persistence to TaskFlow task manager using React 19 useState and controlled form inputs.',
    requirements: [
      'Add task creation form with controlled inputs & validation',
      'Implement task deletion & completion toggle state handlers',
      'Persist task array automatically in browser LocalStorage',
      'Single GitHub repository: push Day 12 commit to github.com/student/taskflow',
    ],
    estimatedMinutes: 90,
    requiredConcepts: ['useState Hook', 'Controlled Inputs', 'LocalStorage Sync', 'Immutable State Updates'],
  },
};

export const PROJECT_MILESTONES: ProjectMilestone[] = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  const projId =
    day <= 7
      ? 'proj-portfolio'
      : day <= 14
      ? 'proj-taskflow'
      : day <= 21
      ? 'proj-weather'
      : day <= 28
      ? 'proj-ecommerce'
      : day <= 42
      ? 'proj-saas'
      : day <= 49
      ? 'proj-ai-workspace'
      : 'proj-capstone';

  const detail = MILESTONE_SYLLABUS[day] || getGenericMilestoneDetail(day, projId);

  return {
    id: `ms-${day}`,
    projectId: projId,
    day,
    title: detail.title,
    description: detail.description,
    requirements: detail.requirements,
    estimatedMinutes: detail.estimatedMinutes,
    requiredConcepts: detail.requiredConcepts,
  };
});

function getGenericMilestoneDetail(day: number, projId: string): MilestoneDetail {
  return {
    title: `Day ${day} Milestone: ${getMilestoneTitle(day)}`,
    description: `Complete Day ${day} project milestone for ${projId}. Push daily code commit to the single project GitHub repository.`,
    requirements: [
      `Implement Day ${day} milestone functionality`,
      'Write clean, typed TypeScript interfaces',
      `Push daily commit to project GitHub repository: github.com/student/${projId.replace('proj-', '')}`,
      'Generate LinkedIn code proof template',
    ],
    estimatedMinutes: 60 + (day % 30),
    requiredConcepts: [`Concept #${day}-1`, `Concept #${day}-2`],
  };
}

function getMilestoneTitle(day: number): string {
  const titles = [
    'Initial Project Scaffold & Semantic Architecture',
    'Responsive Layout & Flexbox Alignment',
    'CSS Grid Component Systems & Micro-animations',
    'Component State Architecture & Events',
    'Form Inputs & Controlled Binding',
    'LocalStorage State Hydration & Sync',
    'Final Production Polish & Vercel Release',
  ];
  return titles[(day - 1) % titles.length] || `Project Milestone #${day}`;
}
