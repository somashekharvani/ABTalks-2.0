import { describe, it, expect } from 'vitest';
import { learningEngine } from '../lib/learning-engine';

describe('Learning Engine Suite', () => {
  it('retrieves correct lesson for Day 12', () => {
    const lesson = learningEngine.getLesson(12);
    expect(lesson.id).toBe('lesson-12');
    expect(lesson.title).toContain('React State Management');
    expect(lesson.durationMinutes).toBe(18);
    expect(lesson.concepts).toContain('useState Hook');
  });

  it('computes journey stage based on completion and assessment status', () => {
    const stageUncompleted = learningEngine.computeJourneyStage('student-a', 1, false);
    expect(stageUncompleted).toBe('LESSON_NOT_STARTED');

    const stageProofSubmitted = learningEngine.computeJourneyStage('student-a', 1, true);
    expect(stageProofSubmitted).toBe('VERIFIED');
  });
});
