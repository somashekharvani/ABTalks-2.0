import { Submission } from '@/types';

export const INITIAL_SUBMISSIONS: Record<string, Submission[]> = {
  'student-a': [],
  'student-b': Array.from({ length: 11 }, (_, i) => {
    const day = i + 1;
    if (day === 10) {
      // Missed / Frozen on day 10
      return null;
    }
    return {
      id: `sub-b-${day}`,
      studentId: 'student-b',
      day,
      githubUrl: `https://github.com/sarahchen-code/abtalks-day-${day}`,
      linkedinUrl: `https://linkedin.com/posts/sarahchen_abtalks-day-${day}-completed`,
      status: 'verified' as const,
      timestamp: `2026-08-${String(day).padStart(2, '0')}T18:30:00Z`,
      feedback: 'Great modular architecture and clean TypeScript interfaces!',
    };
  }).filter(Boolean) as Submission[],
  'student-c': Array.from({ length: 10 }, (_, i) => {
    const day = i + 1;
    return {
      id: `sub-c-${day}`,
      studentId: 'student-c',
      day,
      githubUrl: `https://github.com/marcusvance-dev/abtalks-day-${day}`,
      linkedinUrl: `https://linkedin.com/posts/marcusvance_abtalks-day-${day}-completed`,
      status: 'verified' as const,
      timestamp: `2026-08-${String(day).padStart(2, '0')}T19:45:00Z`,
      feedback: 'Excellent work on performance optimizations.',
    };
  }),
};
