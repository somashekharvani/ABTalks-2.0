import { describe, it, expect } from 'vitest';
import { composeDashboardViewModel } from '../lib/dashboard-composer';
import { STUDENTS } from '../data/students';
import { assessmentEngine } from '../lib/assessment-engine';
import { learningEngine } from '../lib/learning-engine';
import { projectEngine } from '../lib/project-engine';
import { Submission } from '../types';

describe('ABTalks 2.0 Full End-to-End Integration Suite', () => {
  it('executes complete journey: Learn -> Assess -> Build Unlock -> Submit -> Update Dashboard', () => {
    const studentA = STUDENTS['student-a'];
    expect(studentA.currentDay).toBe(1);

    // 1. Learn Topic
    const lesson = learningEngine.getLesson(1);
    expect(lesson.day).toBe(1);
    learningEngine.markLessonCompleted(studentA.id, 1);

    // 2. Take Assessment (Pass with >= 70%)
    const quiz = assessmentEngine.getQuiz(1);
    const answers: Record<string, number> = {};
    quiz.questions.forEach((q) => {
      answers[q.id] = q.correctAnswerIndex;
    });
    const quizResult = assessmentEngine.submitAssessment(studentA.id, 1, answers);
    expect(quizResult.passed).toBe(true);
    expect(assessmentEngine.canUnlockBuild(quizResult)).toBe(true);

    // 3. Build Milestone
    const project = projectEngine.getProjectForDay(1);
    expect(project.id).toBe('proj-portfolio');
    const milestone = projectEngine.getMilestoneForDay(1);
    expect(milestone.day).toBe(1);

    // 4. Submit Proof
    const submission: Submission = {
      id: 'sub-test-a-1',
      studentId: studentA.id,
      day: 1,
      githubUrl: 'https://github.com/alexrivera-dev/personal-portfolio',
      linkedinUrl: 'https://linkedin.com/posts/alexrivera-day1',
      status: 'verified',
      timestamp: new Date().toISOString(),
    };

    // 5. Compose ViewModel & Verify State Updates
    const viewModel = composeDashboardViewModel(studentA, [submission], false, 1);
    expect(viewModel.journeyStage).toBe('VERIFIED');
    expect(viewModel.streak.state).toBe('ACTIVE');
    expect(viewModel.streak.currentStreak).toBe(1);
    expect(viewModel.completedLessonsCount).toBeGreaterThanOrEqual(1);
    expect(viewModel.passedAssessmentsCount).toBeGreaterThanOrEqual(1);
    expect(viewModel.todayTask).toBeDefined();
  });
});
