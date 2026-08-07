import {
  Student,
  Task,
  Submission,
  Achievement,
  DashboardViewModel,
} from '@/types';
import { TASKS } from '@/data/tasks';
import { ACHIEVEMENTS } from '@/data/achievements';
import { storage } from '@/lib/storage';
import { buildDashboardViewModel } from '@/lib/streak-engine';

export async function getStudent(studentId?: string): Promise<Student> {
  const targetId = studentId || storage.getActiveStudentId();
  return storage.getStudent(targetId);
}

export async function getTasks(): Promise<Task[]> {
  return TASKS;
}

export async function getTask(day: number): Promise<Task | null> {
  return TASKS.find((t) => t.day === day) || null;
}

export async function getSubmissions(studentId?: string): Promise<Submission[]> {
  const targetId = studentId || storage.getActiveStudentId();
  return storage.getSubmissions(targetId);
}

export async function getAchievements(): Promise<Achievement[]> {
  return ACHIEVEMENTS;
}

export async function getDashboardData(studentId?: string, recruiterView = false): Promise<DashboardViewModel> {
  const targetId = studentId || storage.getActiveStudentId();
  const student = storage.getStudent(targetId);
  const submissions = storage.getSubmissions(targetId);
  return buildDashboardViewModel(student, submissions, recruiterView);
}

export async function saveSubmission(
  studentId: string,
  day: number,
  githubUrl: string,
  linkedinUrl: string
): Promise<{ submission: Submission; viewModel: DashboardViewModel }> {
  const submission: Submission = {
    id: `sub-${studentId}-${day}-${Date.now()}`,
    studentId,
    day,
    githubUrl,
    linkedinUrl,
    status: 'verified',
    timestamp: new Date().toISOString(),
    feedback: 'Automated verification successful. Great work on maintaining momentum!',
  };

  storage.saveSubmission(submission);

  // Re-build updated ViewModel
  const student = storage.getStudent(studentId);
  const submissions = storage.getSubmissions(studentId);
  const viewModel = buildDashboardViewModel(student, submissions);

  return { submission, viewModel };
}
