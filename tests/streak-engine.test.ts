import { describe, it, expect } from 'vitest';
import {
  computeStreakState,
  calculateMomentumScore,
  generateHeatmap,
  evaluateAchievements,
  generateWeeklyInsight,
  buildDashboardViewModel,
} from '../lib/streak-engine';
import { STUDENTS } from '../data/students';
import { Submission } from '../types';

describe('Streak Engine FSM & ViewModel Suite', () => {
  describe('1. Normal Streak', () => {
    it('calculates active streak for consecutive submissions', () => {
      const student = STUDENTS['student-a'];
      const submissions: Submission[] = [
        {
          id: 's1',
          studentId: 'student-a',
          day: 1,
          githubUrl: 'https://github.com/a/r1',
          linkedinUrl: 'https://linkedin.com/in/a',
          status: 'verified',
          timestamp: '2026-08-01T10:00:00Z',
        },
      ];

      const result = computeStreakState(student, submissions);
      expect(result.state).toBe('ACTIVE');
      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(1);
    });
  });

  describe('2. Freeze Consumption', () => {
    it('consumes a freeze when a day is missed and preserves streak (Student B fixture)', () => {
      const studentB = STUDENTS['student-b'];
      const submissions: Submission[] = Array.from({ length: 11 }, (_, i) => {
        const day = i + 1;
        if (day === 10) return null; // Missed day 10
        return {
          id: `s-${day}`,
          studentId: 'student-b',
          day,
          githubUrl: 'https://github.com/b/r',
          linkedinUrl: 'https://linkedin.com/in/b',
          status: 'verified' as const,
          timestamp: '2026-08-01T10:00:00Z',
        };
      }).filter(Boolean) as Submission[];

      const result = computeStreakState(studentB, submissions);
      expect(result.state).toBe('FROZEN');
      expect(result.currentStreak).toBe(11);
      expect(result.freezesRemaining).toBe(1);
    });
  });

  describe('3. Broken Streak & Recovery Path', () => {
    it('transitions to BROKEN when no freezes remain and activates Recovery Mode (Student C fixture)', () => {
      const studentC = STUDENTS['student-c'];
      const submissions: Submission[] = Array.from({ length: 10 }, (_, i) => ({
        id: `s-${i + 1}`,
        studentId: 'student-c',
        day: i + 1,
        githubUrl: 'https://github.com/c/r',
        linkedinUrl: 'https://linkedin.com/in/c',
        status: 'verified' as const,
        timestamp: '2026-08-01T10:00:00Z',
      }));

      const result = computeStreakState(studentC, submissions);
      expect(result.state).toBe('BROKEN');
      expect(result.recoveryActive).toBe(true);
      expect(result.recoveryMessage?.headline).toBe('Welcome back.');
      expect(result.recoveryMessage?.previousBest).toBe(18);
    });

    it('transitions to RECOVERED when submission is made on recovery path', () => {
      const studentC = STUDENTS['student-c'];
      const submissionsWithRecovery: Submission[] = [
        ...Array.from({ length: 10 }, (_, i) => ({
          id: `s-${i + 1}`,
          studentId: 'student-c',
          day: i + 1,
          githubUrl: 'https://github.com/c/r',
          linkedinUrl: 'https://linkedin.com/in/c',
          status: 'verified' as const,
          timestamp: '2026-08-01T10:00:00Z',
        })),
        {
          id: 'sub-recovery',
          studentId: 'student-c',
          day: 12,
          githubUrl: 'https://github.com/c/recovery',
          linkedinUrl: 'https://linkedin.com/in/c',
          status: 'verified',
          timestamp: '2026-08-12T10:00:00Z',
        },
      ];

      const result = computeStreakState(studentC, submissionsWithRecovery);
      expect(result.state).toBe('RECOVERED');
      expect(result.currentStreak).toBe(1);
    });
  });

  describe('4. Momentum Calculation', () => {
    it('calculates 92/100 score for Student B fixture', () => {
      const studentB = STUDENTS['student-b'];
      const submissions: Submission[] = [];
      const streakResult = computeStreakState(studentB, submissions);
      const momentum = calculateMomentumScore(studentB, submissions, streakResult);

      expect(momentum.value).toBe(92);
      expect(momentum.tier).toBe('Elite Velocity');
      expect(momentum.delta).toBe(8);
    });
  });

  describe('5. Heatmap Generation', () => {
    it('generates 60 dynamic cells with correct statuses and tooltips', () => {
      const student = STUDENTS['student-b'];
      const submissions: Submission[] = [];
      const streakResult = computeStreakState(student, submissions);
      const heatmap = generateHeatmap(student, submissions, streakResult);

      expect(heatmap.length).toBe(60);
      expect(heatmap[0].day).toBe(1);
      expect(heatmap[9].status).toBe('frozen'); // Day 10 freeze
      expect(heatmap[11].status).toBe('today'); // Day 12 active
      expect(heatmap[12].status).toBe('future'); // Day 13 future
    });
  });

  describe('6. Badge Unlock Evaluation', () => {
    it('evaluates unlocked badges correctly based on student progress', () => {
      const studentB = STUDENTS['student-b'];
      const submissions: Submission[] = Array.from({ length: 11 }, (_, i) => ({
        id: `s-${i + 1}`,
        studentId: 'student-b',
        day: i + 1,
        githubUrl: 'https://github.com/b/r',
        linkedinUrl: 'https://linkedin.com/in/b',
        status: 'verified' as const,
        timestamp: '2026-08-01T10:00:00Z',
      }));

      const streakResult = computeStreakState(studentB, submissions);
      const achievements = evaluateAchievements(studentB, submissions, streakResult);

      const firstStep = achievements.find((a) => a.id === 'badge-first-step');
      const sevenDay = achievements.find((a) => a.id === 'badge-7-day-streak');
      const freezeMaster = achievements.find((a) => a.id === 'badge-freeze-master');

      expect(firstStep?.unlocked).toBe(true);
      expect(sevenDay?.unlocked).toBe(true);
      expect(freezeMaster?.unlocked).toBe(true);
    });
  });

  describe('7. Weekly Insight & ViewModel Builder', () => {
    it('builds full DashboardViewModel cleanly', () => {
      const studentB = STUDENTS['student-b'];
      const submissions: Submission[] = [];
      const viewModel = buildDashboardViewModel(studentB, submissions, false);

      expect(viewModel.student.id).toBe('student-b');
      expect(viewModel.todayTask.day).toBe(12);
      expect(viewModel.weeklyInsight.description).toContain('consistency peak');
      expect(viewModel.journey.length).toBeGreaterThan(0);
      expect(viewModel.recruiterView).toBe(false);
    });
  });
});
