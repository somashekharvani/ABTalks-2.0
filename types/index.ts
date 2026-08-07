export type StreakState = 'ACTIVE' | 'AT_RISK' | 'FROZEN' | 'BROKEN' | 'RECOVERED';

export type HeatmapStatus = 'verified' | 'submitted' | 'frozen' | 'missed' | 'today' | 'future';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  githubUrl: string;
  linkedinUrl: string;
  totalFreezes: number;
  usedFreezes: number;
  currentDay: number;
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
  discipline: number; // 0-100
  velocity: number;   // 0-100
  focus: number;      // 0-100
  recovery: number;   // 0-100
  reliability: number;// 0-100
  archetype: 'The Marathon Builder' | 'The Tactical Strategist' | 'The Phoenix Resurgent' | 'The Vanguard Scholar';
  summary: string;
}

export interface AICoachIntelligence {
  headline: string;
  peakWindow: string;
  highRiskDay: string;
  domainVelocityInsight: string;
  successProbability7Day: number; // e.g. 95%
  day30MomentumPrediction: number; // e.g. 96
  day60CompletionProbability: number; // e.g. 92%
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

export interface DashboardViewModel {
  student: Student;
  viewDay: number; // Active viewing day (supports Time Machine mode)
  isSnapshotMode: boolean; // True if viewing historical snapshot
  streak: {
    state: StreakState;
    currentStreak: number;
    longestStreak: number;
    freezesRemaining: number;
    totalFreezes: number;
    freezeUsedToday: boolean;
    isAtRisk: boolean;
    recoveryActive: boolean;
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
