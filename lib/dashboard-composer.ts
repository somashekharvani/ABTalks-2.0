import {
  Student,
  Submission,
  StreakState,
  DashboardViewModel,
} from '@/types';
import { TASKS } from '@/data/tasks';
import { COURSES } from '@/data/courses';
import {
  computeStreakState,
  calculateMomentumScore,
  generateConsistencyDNA,
  generateAICoachIntelligence,
  generateAIRecruiterEvaluation,
  generateActivityFeed,
  generateHeatmap,
  generateWeeklyInsight,
  generateJourneyTimeline,
  evaluateAchievements,
} from './streak-engine';
import { learningEngine } from './learning-engine';
import { assessmentEngine } from './assessment-engine';
import { projectEngine } from './project-engine';
import { notificationEngine } from './notification-engine';

function getMotivationQuote(streakState: StreakState): string {
  switch (streakState) {
    case 'FROZEN':
      return 'Your shield protected the streak. Keep building.';
    case 'BROKEN':
    case 'RECOVERED':
      return 'Your streak reset. Your progress didn’t.';
    case 'ACTIVE':
    default:
      return 'Your streak is a number. Your projects are proof.';
  }
}

export function composeDashboardViewModel(
  student: Student,
  submissions: Submission[],
  recruiterView = false,
  targetDay?: number
): DashboardViewModel {
  const viewDay = targetDay ?? student.currentDay;
  const isSnapshotMode = targetDay !== undefined && targetDay !== student.currentDay;

  const filteredSubmissions = submissions.filter((s) => s.day <= viewDay);
  const todayTask = TASKS.find((t) => t.day === viewDay) || TASKS[0];
  const todaySubmission = filteredSubmissions.find((s) => s.day === viewDay);

  // Pure Consistency Engine outputs
  const streakResult = computeStreakState(student, filteredSubmissions, viewDay);
  const momentum = calculateMomentumScore(student, filteredSubmissions, streakResult, viewDay);
  const dna = generateConsistencyDNA(student, filteredSubmissions, streakResult);
  const aiCoach = generateAICoachIntelligence(student, filteredSubmissions, streakResult, viewDay);
  const recruiterEval = generateAIRecruiterEvaluation(student, filteredSubmissions, streakResult);
  const activityFeed = generateActivityFeed(student, filteredSubmissions, streakResult);
  const heatmap = generateHeatmap(student, submissions, streakResult, viewDay);
  const weeklyInsight = generateWeeklyInsight(student, filteredSubmissions, momentum);
  const achievements = evaluateAchievements(student, filteredSubmissions, streakResult);
  const journey = generateJourneyTimeline(student, filteredSubmissions, streakResult);

  // Pure Learning Engine outputs
  const activeCourse = COURSES.find((c) => c.title === student.track) || COURSES[0];
  const activeLesson = learningEngine.getLesson(viewDay);
  const completedLessonsCount = learningEngine.getCompletedLessonsCount(student.id, viewDay);

  // Pure Assessment Engine outputs
  const activeQuiz = assessmentEngine.getQuiz(viewDay);
  const activeAssessmentResult = assessmentEngine.getAssessmentResult(student.id, viewDay);
  const passedAssessmentsCount = assessmentEngine.getPassedAssessmentsCount(student.id, viewDay);

  // Pure Project Engine outputs
  const activeProject = projectEngine.getProjectForDay(viewDay);
  const activeMilestone = projectEngine.getMilestoneForDay(viewDay);
  const completedProjects = projectEngine.getCompletedProjects(viewDay);

  // Journey stage computation
  const hasSubmittedProof = !!todaySubmission;
  const journeyStage = learningEngine.computeJourneyStage(student.id, viewDay, hasSubmittedProof);

  // Notifications Engine outputs
  const notifications = notificationEngine.getNotifications(student.id);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const motivationQuote = getMotivationQuote(streakResult.state);

  const totalSubmissions = filteredSubmissions.length;
  const completionPercentage = Math.round((totalSubmissions / viewDay) * 100);
  const totalHoursInvested = Math.round(totalSubmissions * 2.5);

  return {
    student,
    viewDay,
    isSnapshotMode,
    journeyStage,
    activeCourse,
    activeProject,
    activeMilestone,
    activeLesson,
    activeQuiz,
    activeAssessmentResult,
    completedLessonsCount,
    passedAssessmentsCount,
    completedProjects,
    notifications,
    unreadNotificationsCount,
    motivationQuote,
    streak: {
      state: streakResult.state,
      currentStreak: streakResult.currentStreak,
      longestStreak: streakResult.longestStreak,
      freezesRemaining: streakResult.freezesRemaining,
      totalFreezes: streakResult.totalFreezes,
      freezeUsedToday: streakResult.freezeUsedToday,
      isAtRisk: streakResult.isAtRisk,
      recoveryActive: streakResult.recoveryActive,
      telemetry: streakResult.telemetry,
      recoveryMessage: streakResult.recoveryMessage,
    },
    momentum,
    dna,
    aiCoach,
    recruiterEval,
    activityFeed,
    heatmap,
    weeklyInsight,
    achievements,
    journey,
    todayTask,
    todaySubmission,
    stats: {
      totalSubmissions,
      completionPercentage,
      totalHoursInvested,
    },
    recruiterView,
  };
}
