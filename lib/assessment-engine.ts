import { QuizAssessment, AssessmentResult } from '@/types';
import { QUIZZES } from '@/data/assessments';

const ASSESSMENT_RESULT_PREFIX = 'abtalks_assessment_result_';
const memoryAssessmentStore = new Map<string, AssessmentResult>();

export const assessmentEngine = {
  getQuiz(day: number): QuizAssessment {
    return QUIZZES.find((q) => q.day === day) || QUIZZES[11];
  },

  getAssessmentResult(studentId: string, day: number): AssessmentResult | undefined {
    const key = `${studentId}_${day}`;
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(`${ASSESSMENT_RESULT_PREFIX}${key}`);
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          // Fallback to memory
        }
      }
    }

    if (memoryAssessmentStore.has(key)) {
      return memoryAssessmentStore.get(key);
    }

    // Default mock results for Student B & Student C on Day 12
    if ((studentId === 'student-b' || studentId === 'student-c') && day === 12) {
      return {
        assessmentId: 'quiz-12',
        scorePercent: 80,
        passed: true,
        correctCount: 4,
        totalQuestions: 5,
        submittedAt: new Date().toISOString(),
      };
    }

    return undefined;
  },

  submitAssessment(
    studentId: string,
    day: number,
    answers: Record<string, number>
  ): AssessmentResult {
    const quiz = this.getQuiz(day);
    let correctCount = 0;

    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercent >= quiz.passingScorePercent; // 70% deterministic threshold

    const result: AssessmentResult = {
      assessmentId: quiz.id,
      scorePercent,
      passed,
      correctCount,
      totalQuestions,
      submittedAt: new Date().toISOString(),
    };

    const key = `${studentId}_${day}`;
    memoryAssessmentStore.set(key, result);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${ASSESSMENT_RESULT_PREFIX}${key}`, JSON.stringify(result));
    }

    return result;
  },

  canUnlockBuild(result?: AssessmentResult): boolean {
    return !!(result && result.passed);
  },

  getPassedAssessmentsCount(studentId: string, currentDay: number): number {
    let count = 0;
    for (let day = 1; day <= currentDay; day++) {
      const res = this.getAssessmentResult(studentId, day);
      if (res && res.passed) {
        count++;
      }
    }
    return count;
  },

  getAverageAssessmentScore(studentId: string, currentDay: number): number {
    let totalScore = 0;
    let count = 0;
    for (let day = 1; day <= currentDay; day++) {
      const res = this.getAssessmentResult(studentId, day);
      if (res) {
        totalScore += res.scorePercent;
        count++;
      }
    }
    if (count === 0) return studentId === 'student-b' ? 88 : 80;
    return Math.round(totalScore / count);
  },
};
