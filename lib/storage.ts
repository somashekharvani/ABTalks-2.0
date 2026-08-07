import { Student, Submission } from '@/types';
import { STUDENTS } from '@/data/students';
import { INITIAL_SUBMISSIONS } from '@/data/submissions';

const ACTIVE_STUDENT_KEY = 'abtalks_active_student';
const SUBMISSIONS_KEY_PREFIX = 'abtalks_submissions_';
const CUSTOM_STUDENTS_KEY = 'abtalks_students_custom';

export const storage = {
  getActiveStudentId(): string {
    if (typeof window === 'undefined') return 'student-b';
    return localStorage.getItem(ACTIVE_STUDENT_KEY) || 'student-b';
  },

  setActiveStudentId(studentId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACTIVE_STUDENT_KEY, studentId);
  },

  getStudent(studentId: string): Student {
    if (typeof window !== 'undefined') {
      const customRaw = localStorage.getItem(CUSTOM_STUDENTS_KEY);
      if (customRaw) {
        try {
          const customStudents = JSON.parse(customRaw);
          if (customStudents[studentId]) {
            return customStudents[studentId];
          }
        } catch {
          // Fallback to memory fixtures
        }
      }
    }
    return STUDENTS[studentId] || STUDENTS['student-b'];
  },

  saveStudent(student: Student): void {
    if (typeof window === 'undefined') return;
    const customRaw = localStorage.getItem(CUSTOM_STUDENTS_KEY);
    let customMap: Record<string, Student> = {};
    if (customRaw) {
      try {
        customMap = JSON.parse(customRaw);
      } catch {
        customMap = {};
      }
    }
    customMap[student.id] = student;
    localStorage.setItem(CUSTOM_STUDENTS_KEY, JSON.stringify(customMap));
  },

  getSubmissions(studentId: string): Submission[] {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(`${SUBMISSIONS_KEY_PREFIX}${studentId}`);
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          // Fallback to initial mock data
        }
      }
    }
    return INITIAL_SUBMISSIONS[studentId] || [];
  },

  saveSubmission(submission: Submission): Submission[] {
    const existing = this.getSubmissions(submission.studentId);
    // Replace if submission for day exists, otherwise push
    const index = existing.findIndex((s) => s.day === submission.day);
    let updated: Submission[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = submission;
    } else {
      updated = [...existing, submission];
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${SUBMISSIONS_KEY_PREFIX}${submission.studentId}`, JSON.stringify(updated));
    }
    return updated;
  },

  resetAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACTIVE_STUDENT_KEY);
    localStorage.removeItem(CUSTOM_STUDENTS_KEY);
    Object.keys(STUDENTS).forEach((id) => {
      localStorage.removeItem(`${SUBMISSIONS_KEY_PREFIX}${id}`);
    });
  },
};
