import { describe, it, expect } from 'vitest';
import { notificationEngine } from '../lib/notification-engine';

describe('Notification Engine Suite', () => {
  it('returns initial notifications for Student B', () => {
    const notifications = notificationEngine.getNotifications('student-b');
    expect(notifications.length).toBeGreaterThan(0);
    expect(notifications.some((n) => n.type === 'BUILD_UNLOCKED')).toBe(true);
  });

  it('adds and marks notifications as read', () => {
    const studentId = 'test-notif-student';
    notificationEngine.addNotification(
      studentId,
      'Test Title',
      'Test Message',
      'LESSON_AVAILABLE'
    );

    const notifs = notificationEngine.getNotifications(studentId);
    expect(notifs[0].title).toBe('Test Title');

    const updated = notificationEngine.markAllAsRead(studentId);
    expect(updated.every((n) => n.read)).toBe(true);
  });
});
