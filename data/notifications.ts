import { NotificationItem } from '@/types';

export const INITIAL_NOTIFICATIONS: Record<string, NotificationItem[]> = {
  'student-a': [
    {
      id: 'notif-a-1',
      timestamp: 'Today',
      title: 'Welcome to ABTalks 2.0!',
      message: 'Day 1 HTML Foundations lesson and Personal Portfolio project milestone are ready.',
      type: 'LESSON_AVAILABLE',
      read: false,
      link: '/day/1',
    },
  ],
  'student-b': [
    {
      id: 'notif-b-1',
      timestamp: '10 min ago',
      title: 'Build Task Unlocked!',
      message: 'You scored 80% on Day 12 React State Assessment. TaskFlow persistence milestone is unlocked.',
      type: 'BUILD_UNLOCKED',
      read: false,
      link: '/day/12',
    },
    {
      id: 'notif-b-2',
      timestamp: '1 hour ago',
      title: 'Assessment Passed',
      message: 'Passed Day 12 React State Management assessment (4/5 correct).',
      type: 'ASSESSMENT_PASSED',
      read: false,
    },
    {
      id: 'notif-b-3',
      timestamp: 'Day 10',
      title: 'Tactical Shield Protection',
      message: 'Missed day absorbed by Tactical Shield freeze. 11-day streak preserved.',
      type: 'FREEZE_CONSUMED',
      read: true,
    },
  ],
  'student-c': [
    {
      id: 'notif-c-1',
      timestamp: 'Today',
      title: 'Recovery Path Active',
      message: 'Previous 18-day streak ended. Submit Day 12 recovery challenge to rebuild your streak.',
      type: 'RECOVERY_AVAILABLE',
      read: false,
      link: '/day/12',
    },
    {
      id: 'notif-c-2',
      timestamp: 'Yesterday',
      title: 'Streak Notice',
      message: 'No freezes remaining. Recovery challenge is ready to reactivate your streak.',
      type: 'STREAK_BROKEN',
      read: true,
    },
  ],
};
