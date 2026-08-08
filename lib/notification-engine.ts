import { NotificationItem, NotificationType } from '@/types';
import { INITIAL_NOTIFICATIONS } from '@/data/notifications';

const NOTIFICATIONS_KEY_PREFIX = 'abtalks_notifications_';
const memoryNotificationStore = new Map<string, NotificationItem[]>();

export const notificationEngine = {
  getNotifications(studentId: string): NotificationItem[] {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(`${NOTIFICATIONS_KEY_PREFIX}${studentId}`);
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          // Fallback to memory
        }
      }
    }

    if (memoryNotificationStore.has(studentId)) {
      return memoryNotificationStore.get(studentId)!;
    }

    return INITIAL_NOTIFICATIONS[studentId] || INITIAL_NOTIFICATIONS['student-b'];
  },

  markAllAsRead(studentId: string): NotificationItem[] {
    const existing = this.getNotifications(studentId);
    const updated = existing.map((n) => ({ ...n, read: true }));
    memoryNotificationStore.set(studentId, updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${NOTIFICATIONS_KEY_PREFIX}${studentId}`, JSON.stringify(updated));
    }
    return updated;
  },

  addNotification(
    studentId: string,
    title: string,
    message: string,
    type: NotificationType,
    link?: string
  ): NotificationItem[] {
    const existing = this.getNotifications(studentId);
    const newItem: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title,
      message,
      type,
      read: false,
      link,
    };
    const updated = [newItem, ...existing];
    memoryNotificationStore.set(studentId, updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${NOTIFICATIONS_KEY_PREFIX}${studentId}`, JSON.stringify(updated));
    }
    return updated;
  },
};
