export type StreakState = 'ACTIVE' | 'AT_RISK' | 'FROZEN' | 'BROKEN' | 'RECOVERED';

export type HeatmapStatus = 'verified' | 'submitted' | 'frozen' | 'missed' | 'today' | 'future';

export type DailyJourneyStage =
  | 'LESSON_NOT_STARTED'
  | 'LEARNING'
  | 'LESSON_COMPLETED'
  | 'ASSESSMENT'
  | 'PASSED'
  | 'BUILD_UNLOCKED'
  | 'BUILD_IN_PROGRESS'
  | 'PROOF_SUBMITTED'
  | 'VERIFIED'
  | 'DAY_COMPLETED';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  track: string; // e.g. "Frontend Development"
  githubUrl: string;
  linkedinUrl: string;
  totalFreezes: number;
  usedFreezes: number;
  currentDay: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizAssessment {
  id: string;
  lessonId: string;
  day: number;
  title: string;
  passingScorePercent: number; // default 70
  questions: QuizQuestion[];
}

export interface AssessmentResult {
  assessmentId: string;
  scorePercent: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
  submittedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  day: number;
  title: string;
  description: string;
  durationMinutes: number;
  videoUrl: string;
  notes: string;
  concepts: string[];
  examples: { title: string; code: string }[];
  quizId: string;
  projectMilestoneId: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  startDay: number;
  endDay: number;
  projectId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationDays: number;
  totalProjects: number;
  badgeIcon: string;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  day: number;
  title: string;
  description: string;
  requirements: string[];
  estimatedMinutes: number;
  requiredConcepts: string[];
}

export interface Project {
  id: string;
  courseId: string;
  title: string;
  description: string;
  durationDays: number; // e.g., 7 or 14
  startDay: number;
  endDay: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  repositoryUrl: string;
  liveUrl?: string;
  techStack: string[];
}

export type NotificationType =
  | 'LESSON_AVAILABLE'
  | 'LESSON_COMPLETED'
  | 'ASSESSMENT_AVAILABLE'
  | 'ASSESSMENT_PASSED'
  | 'ASSESSMENT_FAILED'
  | 'BUILD_UNLOCKED'
  | 'PROJECT_MILESTONE'
  | 'SUBMISSION_PENDING'
  | 'SUBMISSION_VERIFIED'
  | 'STREAK_AT_RISK'
  | 'FREEZE_CONSUMED'
  | 'STREAK_BROKEN'
  | 'RECOVERY_AVAILABLE'
  | 'BADGE_UNLOCKED'
  | 'PROJECT_COMPLETED';

export interface NotificationItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  link?: string;
}

export interface Task {
  day: number;
  title: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'System Design' | 'AI Integration';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requirements: string[];
  githubTemplate: string;
  estimatedHours: number;
  notes: string;
  codeExample: string;
  videoClassUrl: string;
  videoTitle: string;
  videoDuration: string;
  score: number;
}

export interface Submission {
  id: string;
  studentId: string;
  day: number;
  githubUrl: string;
  linkedinUrl: string;
  status: 'submitted' | 'verified' | 'rejected';
  timestamp: string;
  feedback?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  criteria: string;
}

export interface HeatmapCell {
  day: number;
  date: string;
  status: HeatmapStatus;
  tooltip: string;
  streakCount: number;
}

export interface MomentumScore {
  value: number;
  tier: 'Consistent' | 'Building' | 'High Momentum' | 'Elite Velocity';
  delta: number;
  description: string;
}

export interface ConsistencyDNA {
  discipline: number;
  velocity: number;
  focus: number;
  recovery: number;
  reliability: number;
  archetype: 'The Marathon Builder' | 'The Tactical Strategist' | 'The Phoenix Resurgent' | 'The Vanguard Scholar';
  summary: string;
}

export interface AICoachIntelligence {
  headline: string;
  peakWindow: string;
  highRiskDay: string;
  domainVelocityInsight: string;
  successProbability7Day: number;
  day30MomentumPrediction: number;
  day60CompletionProbability: number;
  recommendedAction: string;
}

export interface AIRecruiterEvaluation {
  executiveSummary: string;
  hiringRecommendation: string;
  reputationScore: {
    total: number;
    codeQuality: number;
    consistency: number;
    testing: number;
    documentation: number;
    architecture: number;
  };
  companyMatches: {
    startup: number;
    amazon: number;
    google: number;
    microsoft: number;
  };
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'submission' | 'freeze' | 'recovery' | 'badge' | 'milestone';
}

export interface JourneyEvent {
  id: string;
  day: number;
  title: string;
  description: string;
  type: 'joined' | 'badge' | 'freeze' | 'recovery' | 'milestone';
  date: string;
}

export interface FSMTransitionTelemetry {
  currentState: StreakState;
  previousState: StreakState;
  triggerEvent: string;
  actionTaken: string;
  activeDay: number;
}

export interface DashboardViewModel {
  student: Student;
  viewDay: number;
  isSnapshotMode: boolean;
  journeyStage: DailyJourneyStage;
  activeCourse: Course;
  activeProject: Project;
  activeMilestone: ProjectMilestone;
  activeLesson: Lesson;
  activeQuiz: QuizAssessment;
  activeAssessmentResult?: AssessmentResult;
  completedLessonsCount: number;
  passedAssessmentsCount: number;
  completedProjects: Project[];
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  motivationQuote: string;

  streak: {
    state: StreakState;
    currentStreak: number;
    longestStreak: number;
    freezesRemaining: number;
    totalFreezes: number;
    freezeUsedToday: boolean;
    isAtRisk: boolean;
    recoveryActive: boolean;
    telemetry: FSMTransitionTelemetry;
    recoveryMessage?: {
      title: string;
      headline: string;
      quote: string;
      previousBest: number;
      targetGoal: string;
    };
  };
  momentum: MomentumScore;
  dna: ConsistencyDNA;
  aiCoach: AICoachIntelligence;
  recruiterEval: AIRecruiterEvaluation;
  activityFeed: ActivityLogItem[];
  heatmap: HeatmapCell[];
  weeklyInsight: string;
  achievements: Achievement[];
  journey: JourneyEvent[];
  todayTask: Task;
  todaySubmission?: Submission;
  stats: {
    totalSubmissions: number;
    completionPercentage: number;
    totalHoursInvested: number;
  };
  recruiterView: boolean;
}
