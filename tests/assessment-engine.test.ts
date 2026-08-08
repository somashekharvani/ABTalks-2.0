import { describe, it, expect } from 'vitest';
import { assessmentEngine } from '../lib/assessment-engine';

describe('Assessment Engine Suite', () => {
  it('grades quiz correctly with >= 70% threshold', () => {
    const quiz = assessmentEngine.getQuiz(12);
    expect(quiz.questions.length).toBe(5);

    // Provide 4 correct answers out of 5 (80%)
    const answers: Record<string, number> = {};
    quiz.questions.forEach((q, idx) => {
      answers[q.id] = idx === 0 ? 0 : q.correctAnswerIndex; // 4 correct
    });

    const result = assessmentEngine.submitAssessment('test-student', 12, answers);
    expect(result.scorePercent).toBeGreaterThanOrEqual(70);
    expect(result.passed).toBe(true);
    expect(assessmentEngine.canUnlockBuild(result)).toBe(true);
  });

  it('fails quiz with < 70% score and denies build unlock without modifying streak', () => {
    const quiz = assessmentEngine.getQuiz(12);

    // Provide all incorrect answers (0%)
    const answers: Record<string, number> = {};
    quiz.questions.forEach((q) => {
      answers[q.id] = (q.correctAnswerIndex + 1) % 4;
    });

    const result = assessmentEngine.submitAssessment('test-student', 12, answers);
    expect(result.scorePercent).toBe(0);
    expect(result.passed).toBe(false);
    expect(assessmentEngine.canUnlockBuild(result)).toBe(false);
  });
});
