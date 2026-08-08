import { Lesson, DailyJourneyStage } from '@/types';
import { LESSONS } from '@/data/lessons';
import { assessmentEngine } from './assessment-engine';

const LESSON_PROGRESS_PREFIX = 'abtalks_lesson_completed_';
const memoryLessonStore = new Map<string, boolean>();

export const learningEngine = {
  getLesson(day: number): Lesson {
    return LESSONS.find((l) => l.day === day) || LESSONS[11];
  },

  isLessonCompleted(studentId: string, day: number): boolean {
    const key = `${studentId}_${day}`;
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem(`${LESSON_PROGRESS_PREFIX}${key}`);
      if (val !== null) return val === 'true';
    } else if (memoryLessonStore.has(key)) {
      return memoryLessonStore.get(key) === true;
    }

    if (studentId === 'student-b' || studentId === 'student-c') {
      return day < 12;
    }
    return false;
  },

  markLessonCompleted(studentId: string, day: number): void {
    const key = `${studentId}_${day}`;
    memoryLessonStore.set(key, true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LESSON_PROGRESS_PREFIX}${key}`, 'true');
    }
  },

  computeJourneyStage(
    studentId: string,
    day: number,
    hasSubmittedProof: boolean
  ): DailyJourneyStage {
    if (hasSubmittedProof) return 'VERIFIED';
    const isCompleted = this.isLessonCompleted(studentId, day);
    const assessmentResult = assessmentEngine.getAssessmentResult(studentId, day);

    if (assessmentResult && assessmentResult.passed) return 'BUILD_UNLOCKED';
    if (assessmentResult && !assessmentResult.passed) return 'ASSESSMENT';
    if (isCompleted) return 'LESSON_COMPLETED';
    return 'LESSON_NOT_STARTED';
  },

  getCompletedLessonsCount(studentId: string, currentDay: number): number {
    let count = 0;
    for (let day = 1; day <= currentDay; day++) {
      if (this.isLessonCompleted(studentId, day)) {
        count++;
      }
    }
    return count;
  },
};
