import { Lesson } from '@/types';

interface LessonDetail {
  title: string;
  description: string;
  durationMinutes: number;
  videoUrl: string;
  notes: string;
  concepts: string[];
  examples: { title: string; code: string }[];
}

const LESSON_SYLLABUS: Record<number, LessonDetail> = {
  1: {
    title: 'HTML5 Semantic Architecture & Accessibility',
    description: 'Learn modern semantic tags (<header>, <main>, <article>, <nav>), landmark roles, and ARIA attributes for screen reader accessibility.',
    durationMinutes: 15,
    videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
    notes: `### HTML5 Semantics & Accessibility
1. **Semantic Elements**: Use \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, and \`<footer>\` instead of generic \`<div>\` wrappers.
2. **Accessible Landmarks**: Semantic tags create explicit landmark regions for screen readers.
3. **ARIA Roles & Labels**: Enhance non-standard controls using \`aria-label\`, \`aria-expanded\`, and \`role="button"\`.`,
    concepts: ['Semantic HTML5', 'Screen Reader Accessibility', 'ARIA Landmarks', 'DOM Hierarchy'],
    examples: [
      {
        title: 'Accessible Layout Skeleton',
        code: `<header>\n  <nav aria-label="Main Navigation">\n    <a href="#hero">Home</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h1>Developer Portfolio</h1>\n  </article>\n</main>`,
      },
    ],
  },
  2: {
    title: 'Modern CSS Flexbox & Box Model Alignment',
    description: 'Master Flexbox layout properties (flex-direction, justify-content, align-items) and CSS box model border-box sizing.',
    durationMinutes: 16,
    videoUrl: 'https://www.youtube.com/embed/3YW65K6LcIA',
    notes: `### CSS Flexbox & Box Model Principles
1. **Box Sizing**: Set \`box-sizing: border-box\` globally so padding and border are included in element dimensions.
2. **Main Axis vs Cross Axis**: \`justify-content\` aligns along the main axis; \`align-items\` aligns along the cross axis.
3. **Flex Shrink & Grow**: Control how items expand or compress dynamically inside flexible containers.`,
    concepts: ['Flexbox Layout', 'Box Model', 'Alignment Axis', 'Responsive Flex Spacing'],
    examples: [
      {
        title: 'Flexbox Center Pattern',
        code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}`,
      },
    ],
  },
  3: {
    title: 'CSS Grid Layouts & Responsive Breakpoints',
    description: 'Build two-dimensional responsive layouts using CSS Grid, fr units, repeat(auto-fit, minmax()), and mobile-first media queries.',
    durationMinutes: 18,
    videoUrl: 'https://www.youtube.com/embed/jV8B24rSN5o',
    notes: `### CSS Grid Layout Mastery
1. **2D Grid System**: Define rows and columns simultaneously using \`grid-template-columns\` and \`grid-template-rows\`.
2. **Fluid Auto-Fit**: Use \`repeat(auto-fit, minmax(280px, 1fr))\` to create responsive card grids without media queries.
3. **Grid Gaps**: Maintain consistent spacing using \`gap: 1.5rem\`.`,
    concepts: ['CSS Grid System', 'Fluid Auto-Fit', 'Minmax Utility', 'Responsive Breakpoints'],
    examples: [
      {
        title: 'Responsive Grid Pattern',
        code: `.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}`,
      },
    ],
  },
  4: {
    title: 'JavaScript ES6+ DOM Operations & Events',
    description: 'Explore ES6+ arrow functions, destructuring, querySelector, and event delegation patterns for interactive web pages.',
    durationMinutes: 15,
    videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
    notes: `### JavaScript ES6+ & DOM Events
1. **Event Delegation**: Attach a single listener to a parent container to handle events on multiple child nodes efficiently.
2. **Destructuring**: Extract properties cleanly: \`const { name, role } = developer;\`.
3. **Arrow Functions**: Concise function syntax preserving lexical \`this\` scope.`,
    concepts: ['ES6+ Syntax', 'DOM Delegation', 'Object Destructuring', 'Arrow Functions'],
    examples: [
      {
        title: 'Event Delegation Pattern',
        code: `document.querySelector('#portfolio-grid').addEventListener('click', (e) => {\n  if (e.target.matches('.project-card')) {\n    console.log('Project clicked:', e.target.dataset.id);\n  }\n});`,
      },
    ],
  },
  5: {
    title: 'Async JavaScript, Fetch API & JSON Data Handling',
    description: 'Master async/await syntax, native fetch API requests, JSON response parsing, and robust try/catch error boundaries.',
    durationMinutes: 17,
    videoUrl: 'https://www.youtube.com/embed/cuEtnrL9-H0',
    notes: `### Async JavaScript & Fetch API
1. **Promises & Async/Await**: Write asynchronous asynchronous code that reads synchronously using \`await fetch()\`.
2. **HTTP Response Status**: Check \`response.ok\` before parsing JSON payload.
3. **Error Boundaries**: Wrap asynchronous requests in \`try { ... } catch (err) { ... }\` blocks.`,
    concepts: ['Async/Await', 'Fetch API', 'JSON Response', 'Try/Catch Boundary'],
    examples: [
      {
        title: 'Async Fetch Pattern',
        code: `async function fetchRepos(username) {\n  try {\n    const res = await fetch(\`https://api.github.com/users/\${username}/repos\`);\n    if (!res.ok) throw new Error("GitHub API Error");\n    const repos = await res.json();\n    return repos;\n  } catch (err) {\n    console.error(err);\n  }\n}`,
      },
    ],
  },
  6: {
    title: 'Fluid Typography & CSS Variable Theme Tokens',
    description: 'Architect a dark-mode theme system using CSS custom properties (--bg-primary, --text-primary) and clamp() fluid typography.',
    durationMinutes: 16,
    videoUrl: 'https://www.youtube.com/embed/vqSlv6pvy3U',
    notes: `### CSS Theme Tokens & Typography
1. **CSS Variables**: Declare custom properties under \`:root\` or \`[data-theme="dark"]\` selectors.
2. **Fluid Typography**: Use \`font-size: clamp(1.2rem, 3vw, 2.5rem)\` for fluid scaling across screen sizes.
3. **System Font Stacks**: Leverage system fonts for zero layout shift typography.`,
    concepts: ['CSS Custom Properties', 'Fluid Typography', 'Dark Theme Tokens', 'Zero CLS'],
    examples: [
      {
        title: 'Dark Theme Tokens Pattern',
        code: `:root {\n  --bg-primary: #0f172a;\n  --text-primary: #f8fafc;\n}\n[data-theme="light"] {\n  --bg-primary: #ffffff;\n  --text-primary: #0f172a;\n}`,
      },
    ],
  },
  7: {
    title: 'Personal Portfolio Final Polish & Vercel Deployment',
    description: 'Perform Lighthouse audits, optimize OpenGraph meta tags, configure Vercel deployment, and verify production live URLs.',
    durationMinutes: 20,
    videoUrl: 'https://www.youtube.com/embed/2HBIzY7GPMU',
    notes: `### Deployment & Lighthouse Audit
1. **Lighthouse Audit**: Target 90+ scores in Performance, Accessibility, Best Practices, and SEO.
2. **OpenGraph Meta Tags**: Add \`og:title\`, \`og:image\`, and \`og:description\` for social sharing previews.
3. **Production Deployment**: Connect GitHub repo to Vercel for continuous deployment on push.`,
    concepts: ['Vercel Deployment', 'Lighthouse Audit', 'OpenGraph Meta', 'CI/CD Pipeline'],
    examples: [
      {
        title: 'OpenGraph SEO Head Pattern',
        code: `<meta property="og:title" content="Alex Rivera — Developer Portfolio" />\n<meta property="og:description" content="Full-stack AI developer portfolio built during ABTalks 60-day challenge." />\n<meta property="og:image" content="https://portfolio.vercel.app/og.png" />`,
      },
    ],
  },
  8: {
    title: 'React 19 JSX Syntax & Component Architecture',
    description: 'Learn React 19 functional components, JSX element rules, props passing, and component trees.',
    durationMinutes: 18,
    videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
    notes: `### React 19 Component Foundations
1. **JSX Syntax**: Write HTML-like tags inside JavaScript. Always return a single parent element or \`<Fragment>\`.
2. **Functional Components**: React components are JavaScript functions returning JSX.
3. **Props Passing**: Pass data down the component tree using attributes.`,
    concepts: ['React 19 Functional Components', 'JSX Rules', 'Props Passing', 'Component Tree'],
    examples: [
      {
        title: 'React Functional Component',
        code: `export function TaskCard({ title, isCompleted }) {\n  return (\n    <div className="task-card">\n      <h3>{title}</h3>\n      <span>{isCompleted ? "✓ Done" : "In Progress"}</span>\n    </div>\n  );\n}`,
      },
    ],
  },
  9: {
    title: 'React Props Destructuring & List Rendering',
    description: 'Render dynamic arrays using array.map(), assign unique key props, and apply TypeScript prop interfaces.',
    durationMinutes: 15,
    videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
    notes: `### List Rendering & Key Props
1. **Array Mapping**: Transform data arrays into JSX elements using \`tasks.map(task => ...)\`.
2. **Unique Key Requirement**: Always provide a unique \`key\` prop to top-level mapped elements.
3. **TypeScript Prop Types**: Define explicit interfaces for component props.`,
    concepts: ['Array.map()', 'Unique Key Prop', 'Prop Destructuring', 'TypeScript Interfaces'],
    examples: [
      {
        title: 'List Rendering Pattern',
        code: `export function TaskList({ tasks }) {\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>{task.title}</li>\n      ))}\n    </ul>\n  );\n}`,
      },
    ],
  },
  10: {
    title: 'Form Event Handling & Controlled Inputs',
    description: 'Manage form inputs in React using controlled components, value binding, onChange listeners, and e.preventDefault().',
    durationMinutes: 17,
    videoUrl: 'https://www.youtube.com/embed/SdzMBWT2CDQ',
    notes: `### Controlled Inputs & Form Submissions
1. **Controlled Inputs**: Bind \`value={text}\` to state and update via \`onChange={(e) => setText(e.target.value)}\`.
2. **Form Submit**: Prevent browser page reload using \`e.preventDefault()\`.
3. **Single Source of Truth**: React state drives input display rather than the DOM input value.`,
    concepts: ['Controlled Inputs', 'onChange Handler', 'Form Submission', 'Prevent Default'],
    examples: [
      {
        title: 'Controlled Form Pattern',
        code: `const [input, setInput] = useState("");\nconst handleSubmit = (e) => {\n  e.preventDefault();\n  onAddTask(input);\n  setInput("");\n};\nreturn <form onSubmit={handleSubmit}><input value={input} onChange={e => setInput(e.target.value)} /></form>;`,
      },
    ],
  },
  11: {
    title: 'LocalStorage Persistence & State Hydration Sync',
    description: 'Synchronize React state with browser LocalStorage using lazy state initialization and JSON serialization.',
    durationMinutes: 16,
    videoUrl: 'https://www.youtube.com/embed/0ZJgOiRWEOM',
    notes: `### LocalStorage State Persistence
1. **Lazy Initialization**: Pass a function to \`useState(() => JSON.parse(localStorage.getItem(...)))\` to read storage once.
2. **JSON Serialization**: Use \`JSON.stringify()\` before saving arrays or objects.
3. **Storage Fallbacks**: Provide default fallback arrays if storage key is missing or corrupted.`,
    concepts: ['LocalStorage Sync', 'Lazy State Initializer', 'JSON Serialization', 'Hydration Fallbacks'],
    examples: [
      {
        title: 'Lazy State LocalStorage Pattern',
        code: `const [items, setItems] = useState(() => {\n  if (typeof window === 'undefined') return [];\n  const saved = localStorage.getItem('task_items');\n  return saved ? JSON.parse(saved) : [];\n});`,
      },
    ],
  },
  12: {
    title: 'React State Management & Controlled Components',
    description: 'Master React 19 useState hook patterns, immutable state updates, controlled form inputs, and component re-rendering lifecycles.',
    durationMinutes: 18,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    notes: `### Key React State Concepts
1. **useState Hook**: Declare reactive state variables within functional components.
2. **Immutable State Updates**: Always pass new object/array copies to state setter functions.
3. **Controlled Inputs**: Bind form input values to React state for single source of truth validation.
4. **Re-rendering Pipeline**: React schedules component renders whenever state setters receive new values.`,
    concepts: ['useState Hook', 'Immutable Updates', 'Controlled Form Inputs', 'Re-rendering Lifecycles'],
    examples: [
      {
        title: 'Counter State Pattern',
        code: 'const [count, setCount] = useState(0);\nconst increment = () => setCount(prev => prev + 1);',
      },
      {
        title: 'Controlled Input Pattern',
        code: 'const [text, setText] = useState("");\n<input value={text} onChange={(e) => setText(e.target.value)} />',
      },
    ],
  },
  13: {
    title: 'Custom React Hooks for Reusable Logic',
    description: 'Extract stateful storage and debounce logic into custom hooks (useLocalStorage, useDebounce) following Hook Rules.',
    durationMinutes: 19,
    videoUrl: 'https://www.youtube.com/embed/6ThXsUwLWvc',
    notes: `### Custom React Hooks
1. **Naming Convention**: Custom hook functions must start with \`use\` (e.g., \`useLocalStorage\`).
2. **State Abstraction**: Encapsulate useState and storage listeners inside custom hooks to keep UI components clean.
3. **Return API**: Return state and updater tuples or object helper methods.`,
    concepts: ['Custom React Hooks', 'useLocalStorage', 'State Abstraction', 'Reusable Utility'],
    examples: [
      {
        title: 'useLocalStorage Hook',
        code: `export function useLocalStorage(key, initialValue) {\n  const [stored, setStored] = useState(() => {\n    const item = localStorage.getItem(key);\n    return item ? JSON.parse(item) : initialValue;\n  });\n  const setValue = (value) => {\n    setStored(value);\n    localStorage.setItem(key, JSON.stringify(value));\n  };\n  return [stored, setValue];\n}`,
      },
    ],
  },
  14: {
    title: 'TaskFlow Final Polish & Production Release',
    description: 'Implement task status filters (All, Active, Completed), batch deletion, responsive UI polish, and production Vercel release.',
    durationMinutes: 22,
    videoUrl: 'https://www.youtube.com/embed/SccSCuHhOw0',
    notes: `### TaskFlow Production Sprint Completion
1. **Derived Filtering**: Compute filtered list on the fly without duplicating state: \`tasks.filter(t => filter === 'all' || t.status === filter)\`.
2. **Batch Actions**: Provide clear-all completed button handlers.
3. **Sprint Proof**: Push Day 14 final commit to single repository \`github.com/student/taskflow\`.`,
    concepts: ['Derived State Filtering', 'Batch Actions', 'Sprint Finalization', 'Vercel Deploy'],
    examples: [
      {
        title: 'Derived State Filtering',
        code: `const filteredTasks = tasks.filter(task => {\n  if (filter === 'active') return !task.isCompleted;\n  if (filter === 'completed') return task.isCompleted;\n  return true;\n});`,
      },
    ],
  },
};

export const LESSONS: Lesson[] = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  const moduleId =
    day <= 7
      ? 'mod-1'
      : day <= 14
      ? 'mod-2'
      : day <= 21
      ? 'mod-3'
      : day <= 28
      ? 'mod-4'
      : day <= 42
      ? 'mod-5'
      : day <= 49
      ? 'mod-6'
      : 'mod-7';

  const detail = LESSON_SYLLABUS[day] || getGenericLessonDetail(day);

  return {
    id: `lesson-${day}`,
    courseId: 'course-frontend',
    moduleId,
    day,
    title: detail.title,
    description: detail.description,
    durationMinutes: detail.durationMinutes,
    videoUrl: detail.videoUrl,
    notes: detail.notes,
    concepts: detail.concepts,
    examples: detail.examples,
    quizId: `quiz-${day}`,
    projectMilestoneId: `ms-${day}`,
  };
});

function getGenericLessonDetail(day: number): LessonDetail {
  const title = `Day ${day}: Advanced Engineering Principles`;
  return {
    title,
    description: `Master core software architecture, performance optimization, and type safety for Day ${day} of the challenge.`,
    durationMinutes: 15 + (day % 10),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    notes: `### Day ${day} Notes & Principles
1. **Core Concept**: Focus on mastering scalable engineering patterns for Day ${day}.
2. **Type Safety**: Enforce strict TypeScript typing across parameters and return types.
3. **Verification**: Complete code proof milestone and submit daily commit.`,
    concepts: [`Concept A #${day}`, `Concept B #${day}`, `Architecture #${day}`],
    examples: [
      {
        title: `Day ${day} Implementation Sample`,
        code: `// Day ${day} Production Code Sample\nexport function verifyDay${day}Module(input: string) {\n  return { day: ${day}, verified: true };\n}`,
      },
    ],
  };
}
