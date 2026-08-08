import { QuizAssessment } from '@/types';

interface QuizDetail {
  title: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
}

const QUIZ_SYLLABUS: Record<number, QuizDetail> = {
  1: {
    title: 'Day 1 Assessment: HTML5 Semantics & Accessibility',
    questions: [
      {
        id: 'q-1-1',
        question: 'Which element should be used for the primary navigation links of a website?',
        options: ['<div class="nav">', '<nav>', '<section>', '<header>'],
        correctAnswerIndex: 1,
        explanation: '<nav> is the dedicated HTML5 semantic element for major navigation blocks.',
      },
      {
        id: 'q-1-2',
        question: 'What is the purpose of ARIA landmark roles?',
        options: [
          'To speed up CSS rendering',
          'To help assistive technologies identify page sections',
          'To create responsive grid gaps',
          'To hide elements from mobile users',
        ],
        correctAnswerIndex: 1,
        explanation: 'ARIA landmark roles provide structural context for screen readers.',
      },
      {
        id: 'q-1-3',
        question: 'How many <main> elements should exist per HTML page?',
        options: ['Unlimited', 'Exactly one unique <main> element', 'At least 3', 'Zero'],
        correctAnswerIndex: 1,
        explanation: 'An HTML document must contain only one <main> element representing the primary content.',
      },
      {
        id: 'q-1-4',
        question: 'Which attribute provides accessible names for icon-only buttons?',
        options: ['aria-label', 'title-text', 'alt-name', 'role-id'],
        correctAnswerIndex: 0,
        explanation: 'aria-label provides an accessible textual label when no visible text is present.',
      },
      {
        id: 'q-1-5',
        question: 'Does failing a quiz break your challenge submission streak?',
        options: ['Yes', 'No, quiz scores and streak consistency are independent', 'Only on weekends', 'Resets streak to 0'],
        correctAnswerIndex: 1,
        explanation: 'Rule: Quiz failure does NOT break a streak. Learning progress and streak consistency are separate.',
      },
    ],
  },
  2: {
    title: 'Day 2 Assessment: Modern CSS Flexbox & Box Model',
    questions: [
      {
        id: 'q-2-1',
        question: 'Which CSS property includes padding and borders in an element’s total width?',
        options: ['box-sizing: content-box', 'box-sizing: border-box', 'margin-trim: flex', 'overflow: fit'],
        correctAnswerIndex: 1,
        explanation: 'box-sizing: border-box forces padding and borders to be calculated within the declared width.',
      },
      {
        id: 'q-2-2',
        question: 'Which property aligns flex items along the cross axis?',
        options: ['justify-content', 'align-items', 'flex-direction', 'flex-wrap'],
        correctAnswerIndex: 1,
        explanation: 'align-items controls cross-axis alignment in Flexbox.',
      },
      {
        id: 'q-2-3',
        question: 'What is the default flex-direction value in CSS Flexbox?',
        options: ['column', 'row', 'row-reverse', 'grid'],
        correctAnswerIndex: 1,
        explanation: 'The default flex-direction value is "row".',
      },
      {
        id: 'q-2-4',
        question: 'How do you space flex items evenly with space at the outer edges?',
        options: ['justify-content: space-around', 'justify-content: space-between', 'align-items: center', 'flex: 1'],
        correctAnswerIndex: 0,
        explanation: 'space-around distributes space evenly between and outside items.',
      },
      {
        id: 'q-2-5',
        question: 'What passing threshold is required to unlock the daily build task?',
        options: ['50%', '60%', '70%', '100%'],
        correctAnswerIndex: 2,
        explanation: '70% is the deterministic passing score required to unlock the build task.',
      },
    ],
  },
  8: {
    title: 'Day 8 Assessment: React 19 JSX & Components',
    questions: [
      {
        id: 'q-8-1',
        question: 'What must a React component function return?',
        options: ['JSON string', 'JSX element tree or null', 'HTML file link', 'CSS stylesheet'],
        correctAnswerIndex: 1,
        explanation: 'React components return JSX element trees or null for rendering.',
      },
      {
        id: 'q-8-2',
        question: 'Why are Fragment tags (<>...</>) used in React?',
        options: [
          'To speed up JavaScript execution',
          'To group multiple children without adding extra DOM nodes',
          'To apply global CSS styles',
          'To connect to a database',
        ],
        correctAnswerIndex: 1,
        explanation: 'Fragments group sibling elements without introducing redundant wrapper <div> nodes into the DOM.',
      },
      {
        id: 'q-8-3',
        question: 'How are props passed to child components in React?',
        options: ['Global variables', 'JSX attributes (e.g. <Card title="Task" />)', 'CSS selectors', 'LocalStorage'],
        correctAnswerIndex: 1,
        explanation: 'Props are passed as attributes on JSX tags.',
      },
      {
        id: 'q-8-4',
        question: 'What is a core characteristic of React props?',
        options: ['Props are read-only (immutable) in the receiving child', 'Props can be directly mutated', 'Props are global', 'Props only accept numbers'],
        correctAnswerIndex: 0,
        explanation: 'Props are immutable data flows from parent to child.',
      },
      {
        id: 'q-8-5',
        question: 'Does failing a React quiz reset your streak?',
        options: ['Yes', 'No, learning progress and streak consistency are independent', 'Only in production', 'Resets streak'],
        correctAnswerIndex: 1,
        explanation: 'Quiz failure does NOT affect your daily challenge streak.',
      },
    ],
  },
  12: {
    title: 'Day 12 Assessment: React State Management',
    questions: [
      {
        id: 'q-12-1',
        question: 'What triggers a React component to re-render in functional components?',
        options: [
          'Updating a standard JS variable',
          'Calling a state setter returned by useState',
          'Saving a file in VSCode',
          'Refreshing CSS stylesheet',
        ],
        correctAnswerIndex: 1,
        explanation: 'React components schedule re-renders when a state setter returned by useState is called with a new value.',
      },
      {
        id: 'q-12-2',
        question: 'Why should state arrays and objects be updated immutably in React?',
        options: [
          'React relies on object reference changes to detect state mutations',
          'Direct mutation is forbidden by JavaScript engine',
          'It makes code run 100x faster',
          'Direct mutation deletes localStorage',
        ],
        correctAnswerIndex: 0,
        explanation: 'React performs shallow comparison on state object references to know when to re-render UI.',
      },
      {
        id: 'q-12-3',
        question: 'What defines a "controlled component" in React form elements?',
        options: [
          'Form powered by backend server',
          'Input value driven by React state with an onChange handler',
          'Input wrapped in a div',
          'Input using CSS grid',
        ],
        correctAnswerIndex: 1,
        explanation: 'A controlled component has its value bound to React state and updates state via an onChange listener.',
      },
      {
        id: 'q-12-4',
        question: 'What happens if you directly mutate state like `user.name = "Alice"`?',
        options: [
          'React will throw a red screen error immediately',
          'React will fail to trigger a component re-render',
          'Browser will close',
          'LocalStorage is cleared',
        ],
        correctAnswerIndex: 1,
        explanation: 'Direct mutations do not change the object reference, so React does not know to re-render.',
      },
      {
        id: 'q-12-5',
        question: 'How should you update state when the next state depends on the previous state?',
        options: [
          'Pass a callback function: `setCount(prev => prev + 1)`',
          'Use a global variable',
          'Call setImmediate()',
          'Wait 5 seconds',
        ],
        correctAnswerIndex: 0,
        explanation: 'Passing a functional update callback ensures you always receive the latest state snapshot.',
      },
    ],
  },
};

export const QUIZZES: QuizAssessment[] = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  const syllabus = QUIZ_SYLLABUS[day] || getGenericQuiz(day);

  return {
    id: `quiz-${day}`,
    lessonId: `lesson-${day}`,
    day,
    title: syllabus.title,
    passingScorePercent: 70,
    questions: syllabus.questions,
  };
});

function getGenericQuiz(day: number): QuizDetail {
  return {
    title: `Day ${day} Assessment`,
    questions: [
      {
        id: `q-${day}-1`,
        question: `What is the primary objective of the Day ${day} topic?`,
        options: ['Build production-quality code', 'Format CSS styles', 'Run static type checks', 'All of the above'],
        correctAnswerIndex: 3,
        explanation: 'All options contribute to building production-ready web applications.',
      },
      {
        id: `q-${day}-2`,
        question: `Which tool is used for type safety on Day ${day}?`,
        options: ['TypeScript', 'Python', 'Java', 'Ruby'],
        correctAnswerIndex: 0,
        explanation: 'TypeScript provides compile-time static type checking.',
      },
      {
        id: `q-${day}-3`,
        question: `What is a best practice for clean component architecture?`,
        options: ['Single Source of Truth', 'Separation of Concerns', 'Reusable Presentation Props', 'All of the above'],
        correctAnswerIndex: 3,
        explanation: 'Clean architecture prioritizes single sources of truth and reusable UI components.',
      },
      {
        id: `q-${day}-4`,
        question: `What is the required passing score for this assessment?`,
        options: ['50%', '60%', '70%', '100%'],
        correctAnswerIndex: 2,
        explanation: '70% is the deterministic passing threshold required to unlock the build task.',
      },
      {
        id: `q-${day}-5`,
        question: `Does failing a quiz break your challenge submission streak?`,
        options: ['Yes', 'No, quiz progress & streak consistency are independent', 'Only on Fridays', 'Yes, resets to 0'],
        correctAnswerIndex: 1,
        explanation: 'Rule: Quiz failure does NOT break a streak. Learning progress and streak consistency are independent.',
      },
    ],
  };
}
