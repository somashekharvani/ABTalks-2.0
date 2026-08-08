import { describe, it, expect } from 'vitest';
import {
  computeStreakState,
  calculateMomentumScore,
  generateHeatmap,
  evaluateAchievements,
  buildDashboardViewModel,
} from '../lib/streak-engine';
import { validateGithubUrl, validateLinkedinUrl } from '../lib/utils';
import { STUDENTS } from '../data/students';
import { Submission } from '../types';

describe('Streak Engine FSM & ViewModel Suite', () => {
  describe('1. FSM State Transitions', () => {
    it('handles ACTIVE -> AT_RISK -> FROZEN state transitions on missed day with freeze', () => {
      const studentB = STUDENTS['student-b'];
      const result = computeStreakState(studentB, []);
      expect(result.state).toBe('FROZEN');
      expect(result.telemetry.triggerEvent).toBe('freeze_consumed');
      expect(result.telemetry.previousState).toBe('AT_RISK');
    });

    it('handles AT_RISK -> BROKEN when no freezes remain', () => {
      const studentC = STUDENTS['student-c'];
      const result = computeStreakState(studentC, []);
      expect(result.state).toBe('BROKEN');
      expect(result.telemetry.triggerEvent).toBe('no_freeze_remaining');
      expect(result.recoveryActive).toBe(true);
    });

    it('handles BROKEN -> RECOVERED upon recovery submission', () => {
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
      expect(result.telemetry.triggerEvent).toBe('recovery_submitted');
    });
  });

  describe('2. URL Validation Engine', () => {
    it('validates GitHub repository URLs correctly', () => {
      expect(validateGithubUrl('https://github.com/username/repo')).toBe(true);
      expect(validateGithubUrl('https://github.com/user-name/my-repo-123')).toBe(true);
      expect(validateGithubUrl('https://invalid-url.com')).toBe(false);
      expect(validateGithubUrl('github.com/no-protocol')).toBe(false);
    });

    it('validates LinkedIn post URLs correctly', () => {
      expect(validateLinkedinUrl('https://linkedin.com/posts/username_post')).toBe(true);
      expect(validateLinkedinUrl('https://www.linkedin.com/in/username')).toBe(true);
      expect(validateLinkedinUrl('https://random-social.com/post')).toBe(false);
    });
  });

  describe('3. Time Machine Snapshot Engine', () => {
    it('generates accurate historical snapshot state for target day', () => {
      const studentB = STUDENTS['student-b'];
      const day1Snapshot = buildDashboardViewModel(studentB, [], false, 1);
      expect(day1Snapshot.viewDay).toBe(1);
      expect(day1Snapshot.isSnapshotMode).toBe(true);

      const day10Snapshot = buildDashboardViewModel(studentB, [], false, 10);
      expect(day10Snapshot.viewDay).toBe(10);
    });
  });

  describe('4. Heatmap Matrix Generation', () => {
    it('generates 60 dynamic cells with correct status color mappings', () => {
      const student = STUDENTS['student-b'];
      const streakResult = computeStreakState(student, []);
      const heatmap = generateHeatmap(student, [], streakResult);

      expect(heatmap.length).toBe(60);
      expect(heatmap[9].status).toBe('frozen'); // Day 10 freeze
      expect(heatmap[11].status).toBe('today'); // Day 12 active
      expect(heatmap[12].status).toBe('future'); // Day 13 locked
    });
  });

  describe('5. Momentum Score Engine', () => {
    it('calculates 92/100 score for Student B fixture', () => {
      const studentB = STUDENTS['student-b'];
      const streakResult = computeStreakState(studentB, []);
      const momentum = calculateMomentumScore(studentB, [], streakResult);

      expect(momentum.value).toBe(92);
      expect(momentum.tier).toBe('Elite Velocity');
      expect(momentum.delta).toBe(8);
    });
  });

  describe('6. Achievements & Track Metadata', () => {
    it('evaluates unlocked achievements and returns track name', () => {
      const studentB = STUDENTS['student-b'];
      expect(studentB.track).toBe('Frontend Development');

      const mockSubmissions: Submission[] = Array.from({ length: 11 }, (_, i) => ({
        id: `sub-${i + 1}`,
        studentId: 'student-b',
        day: i + 1,
        githubUrl: 'https://github.com/test/repo',
        linkedinUrl: 'https://linkedin.com/posts/test',
        status: 'verified' as const,
        timestamp: new Date().toISOString(),
      }));

      const streakResult = computeStreakState(studentB, mockSubmissions);
      const achievements = evaluateAchievements(studentB, mockSubmissions, streakResult);

      const firstStep = achievements.find((a) => a.id === 'badge-first-step');
      expect(firstStep?.unlocked).toBe(true);
    });
  });
});
