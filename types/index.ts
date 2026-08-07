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
